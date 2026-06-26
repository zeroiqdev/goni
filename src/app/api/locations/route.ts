import { NextResponse } from 'next/server'

type CountriesNowResponse<T> = {
  error?: boolean
  msg?: string
  data?: T
}

const COUNTRIES_NOW_BASE_URL = 'https://countriesnow.space/api/v0.1'
const DEFAULT_COUNTRIES = ['Nigeria']
const NIGERIA_STATES = [
  'Abia State',
  'Adamawa State',
  'Akwa Ibom State',
  'Anambra State',
  'Bauchi State',
  'Bayelsa State',
  'Benue State',
  'Borno State',
  'Cross River State',
  'Delta State',
  'Ebonyi State',
  'Edo State',
  'Ekiti State',
  'Enugu State',
  'FCT',
  'Gombe State',
  'Imo State',
  'Jigawa State',
  'Kaduna State',
  'Kano State',
  'Katsina State',
  'Kebbi State',
  'Kogi State',
  'Kwara State',
  'Lagos State',
  'Nasarawa State',
  'Niger State',
  'Ogun State',
  'Ondo State',
  'Osun State',
  'Oyo State',
  'Plateau State',
  'Rivers State',
  'Sokoto State',
  'Taraba State',
  'Yobe State',
  'Zamfara State',
]
const NIGERIA_CITY_FALLBACKS: Record<string, string[]> = {
  abuja: ['Abaji', 'Bwari', 'Garki', 'Gwagwalada', 'Kuje', 'Kwali', 'Maitama', 'Wuse'],
  'federal capital territory': ['Abaji', 'Bwari', 'Garki', 'Gwagwalada', 'Kuje', 'Kwali', 'Maitama', 'Wuse'],
  'lagos state': ['Agege', 'Ajah', 'Alimosho', 'Epe', 'Ikeja', 'Ikorodu', 'Lekki', 'Surulere', 'Victoria Island', 'Yaba'],
  lagos: ['Agege', 'Ajah', 'Alimosho', 'Epe', 'Ikeja', 'Ikorodu', 'Lekki', 'Surulere', 'Victoria Island', 'Yaba'],
  fct: ['Abaji', 'Bwari', 'Garki', 'Gwagwalada', 'Kuje', 'Kwali', 'Maitama', 'Wuse'],
}

function normalizeLookup(value: string) {
  return value.trim().replace(/\s+State$/i, '').toLowerCase()
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

async function countriesNow<T>(path: string, body?: Record<string, string>) {
  const response = await fetch(`${COUNTRIES_NOW_BASE_URL}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 * 60 * 24 },
  })

  if (!response.ok) throw new Error(`CountriesNow request failed with ${response.status}`)

  const payload = (await response.json()) as CountriesNowResponse<T>
  if (payload.error) throw new Error(payload.msg || 'CountriesNow returned an error')

  return payload.data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const country = searchParams.get('country') || ''
  const state = searchParams.get('state') || ''

  try {
    if (action === 'countries') {
      const data = await countriesNow<Array<{ name?: string; country?: string }>>('/countries/iso')
      const countries =
        data
          ?.map((item) => item.name || item.country)
          .filter((item): item is string => Boolean(item))
          .sort((a, b) => a.localeCompare(b)) || DEFAULT_COUNTRIES

      return NextResponse.json({ countries })
    }

    if (action === 'states') {
      if (!country) return NextResponse.json({ states: [] })

      const data = await countriesNow<{ states?: Array<{ name?: string }> }>('/countries/states', {
        country,
      })
      const states =
        data?.states
          ?.map((item) => item.name)
          .filter((item): item is string => Boolean(item))
          .sort((a, b) => a.localeCompare(b)) || []

      return NextResponse.json({
        states: states.length || country.toLowerCase() !== 'nigeria' ? states : NIGERIA_STATES,
      })
    }

    if (action === 'cities') {
      if (!country || !state) return NextResponse.json({ cities: [] })

      const data = await countriesNow<string[]>('/countries/state/cities', {
        country,
        state,
      })

      const cities = getStringArray(data).sort((a, b) => a.localeCompare(b))
      const fallbackCities = NIGERIA_CITY_FALLBACKS[normalizeLookup(state)] || []

      return NextResponse.json({
        cities: cities.length || country.toLowerCase() !== 'nigeria' ? cities : fallbackCities,
      })
    }

    return NextResponse.json({ error: 'Invalid locations action' }, { status: 400 })
  } catch (err) {
    console.error('Locations proxy failed:', err)
    return NextResponse.json(
      {
        countries: action === 'countries' ? DEFAULT_COUNTRIES : undefined,
        states: action === 'states' && country.toLowerCase() === 'nigeria' ? NIGERIA_STATES : [],
        cities:
          action === 'cities' && country.toLowerCase() === 'nigeria'
            ? NIGERIA_CITY_FALLBACKS[normalizeLookup(state)] || []
            : [],
        fallback: true,
      },
      { status: 200 },
    )
  }
}
