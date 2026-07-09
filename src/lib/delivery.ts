const DEFAULT_FEZ_BASE_URL = 'https://apisandbox.fezdelivery.co/v1'
const FEZ_REQUEST_TIMEOUT_MS = 8000

type UnknownRecord = Record<string, unknown>

export type FezState = {
  id: number
  state: string
}

export type FezHub = {
  id: number
  name: string
  address: string
}

export function normalizeNigeriaState(state: string) {
  const normalized = state.trim().replace(/\s+State$/i, '')

  return /^(fct|abuja|federal capital territory)$/i.test(normalized) ? 'FCT' : normalized
}

export function isNigeria(country?: string) {
  return (country || '').trim().toLowerCase() === 'nigeria'
}

export function parseWeightKg(weight?: string | number | null) {
  if (typeof weight === 'number') return weight > 0 ? weight : 0
  if (!weight) return 0

  const match = weight.toLowerCase().match(/(\d+(?:\.\d+)?)\s*(kg|kilogram|kilograms|g|gram|grams)\b/)
  if (!match) return 0

  const value = Number(match[1])
  if (!Number.isFinite(value) || value <= 0) return 0

  return match[2].startsWith('kg') || match[2].startsWith('kilogram') ? value : value / 1000
}

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as UnknownRecord) : {}
}

function asNumber(value: unknown) {
  const numberValue = typeof value === 'string' ? Number(value) : value
  return typeof numberValue === 'number' && Number.isFinite(numberValue) ? numberValue : 0
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function getFezConfig() {
  return {
    baseUrl: (process.env.FEZ_BASE_URL || DEFAULT_FEZ_BASE_URL).replace(/\/$/, ''),
    secretKey: process.env.FEZ_SECRET_KEY,
    userId: process.env.FEZ_USER_ID,
    password: process.env.FEZ_PASSWORD,
    pickUpState: process.env.FEZ_PICKUP_STATE || 'FCT',
  }
}

// In-memory token cache — survives across requests within the same Node process
let cachedAuthToken: string | null = null
let tokenExpiresAt: number = 0

/**
 * Authenticate with the Fez API using user_id + password.
 * Returns a bearer token and caches it in-memory until expiry.
 * Fez endpoint: POST /v1/user/authenticate
 */
async function authenticateFez(): Promise<string> {
  // Return cached token if still valid (with 60s safety margin)
  if (cachedAuthToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedAuthToken
  }

  const { baseUrl, userId, password } = getFezConfig()

  if (!userId || !password) {
    throw new Error(
      'FEZ_USER_ID and FEZ_PASSWORD must be set in your environment to authenticate with the Fez Delivery API',
    )
  }

  const response = await fetchWithTimeout(`${baseUrl}/user/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, password }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Fez authentication failed with status ${response.status}`)
  }

  const payload = asRecord(await response.json())

  if (payload.status === 'Error') {
    throw new Error(asString(payload.description) || 'Fez authentication returned an error')
  }

  const authDetails = asRecord(payload.authDetails)
  const authToken = asString(authDetails.authToken)

  if (!authToken) {
    throw new Error('Fez authentication response did not include an authToken')
  }

  // Cache the token; parse expiry from response or default to 23 hours
  const expireTokenStr = asString(authDetails.expireToken)
  if (expireTokenStr) {
    const expiry = new Date(expireTokenStr).getTime()
    tokenExpiresAt = Number.isFinite(expiry) ? expiry : Date.now() + 23 * 60 * 60 * 1000
  } else {
    tokenExpiresAt = Date.now() + 23 * 60 * 60 * 1000
  }

  cachedAuthToken = authToken
  console.log('Fez auth token obtained, expires:', new Date(tokenExpiresAt).toISOString())

  return authToken
}

/**
 * Build authenticated headers for Fez API requests.
 * Automatically logs in if no valid token is cached.
 */
async function getFezHeaders(forceRefresh = false): Promise<HeadersInit> {
  const { secretKey } = getFezConfig()
  
  if (forceRefresh) {
    cachedAuthToken = null
    tokenExpiresAt = 0
  }

  const authToken = await authenticateFez()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  }

  if (secretKey) headers['secret-key'] = secretKey

  return headers
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = FEZ_REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

export async function fetchFezDeliveryCost({
  state,
  weight,
}: {
  state: string
  weight?: number
}) {
  const { baseUrl, secretKey, pickUpState } = getFezConfig()

  if (!state.trim()) {
    throw new Error('Delivery state is required to calculate shipping')
  }

  if (!secretKey) {
    throw new Error('FEZ_SECRET_KEY is not configured; delivery cost cannot be calculated')
  }

  try {
    let headers = await getFezHeaders()
    let response = await fetchWithTimeout(`${baseUrl}/order/cost`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        state: normalizeNigeriaState(state),
        pickUpState: normalizeNigeriaState(pickUpState),
        weight: Math.max(weight || 0, 0.1),
      }),
      cache: 'no-store',
    })

    if (response.status === 401) {
      console.warn('Fez token expired (401), refreshing token and retrying cost lookup...')
      headers = await getFezHeaders(true)
      response = await fetchWithTimeout(`${baseUrl}/order/cost`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          state: normalizeNigeriaState(state),
          pickUpState: normalizeNigeriaState(pickUpState),
          weight: Math.max(weight || 0, 0.1),
        }),
        cache: 'no-store',
      })
    }

    if (!response.ok) throw new Error(`Fez cost request failed with ${response.status}`)

    const payload = asRecord(await response.json())
    const cost = asRecord(payload.cost || payload.Cost)
    const vat = asRecord(payload.vat)
    const totalCost = asNumber(payload.totalCost)
    const deliveryCost = asNumber(cost.cost)
    const vatAmount = asNumber(vat.vatAmount)
    const fee = totalCost || deliveryCost + vatAmount

    if (!fee) throw new Error('Fez cost response did not include a usable fee')

    return { fee }
  } catch (err) {
    console.error('Fez delivery cost lookup failed:', err)
    throw err
  }
}

export async function createFezOrder({
  orderNumber,
  customer,
  valueOfItem,
  weight,
  itemDescription,
}: {
  orderNumber: string
  customer: {
    name?: string
    email?: string
    phone?: string
    address?: string
    city?: string
    state?: string
  }
  valueOfItem: number
  weight: number
  itemDescription: string
}) {
  const { baseUrl, secretKey, pickUpState } = getFezConfig()

  if (!secretKey || !customer.state) {
    throw new Error('Fez credentials and customer state are required to create a delivery order')
  }

  try {
    let headers = await getFezHeaders()
    let response = await fetchWithTimeout(`${baseUrl}/order`, {
      method: 'POST',
      headers,
      body: JSON.stringify([
        {
          recipientAddress: [customer.address, customer.city].filter(Boolean).join(', '),
          recipientState: normalizeNigeriaState(customer.state),
          recipientName: customer.name,
          recipientPhone: customer.phone,
          recipientEmail: customer.email,
          uniqueID: orderNumber,
          BatchID: orderNumber,
          itemDescription,
          valueOfItem: String(Math.round(valueOfItem)),
          weight: Math.max(Math.ceil(weight || 0), 1),
          pickUpState: normalizeNigeriaState(pickUpState),
          isItemCod: false,
          fragile: false,
        },
      ]),
      cache: 'no-store',
    })

    if (response.status === 401) {
      console.warn('Fez token expired (401), refreshing token and retrying order creation...')
      headers = await getFezHeaders(true)
      response = await fetchWithTimeout(`${baseUrl}/order`, {
        method: 'POST',
        headers,
        body: JSON.stringify([
          {
            recipientAddress: [customer.address, customer.city].filter(Boolean).join(', '),
            recipientState: normalizeNigeriaState(customer.state),
            recipientName: customer.name,
            recipientPhone: customer.phone,
            recipientEmail: customer.email,
            uniqueID: orderNumber,
            BatchID: orderNumber,
            itemDescription,
            valueOfItem: String(Math.round(valueOfItem)),
            weight: Math.max(Math.ceil(weight || 0), 1),
            pickUpState: normalizeNigeriaState(pickUpState),
            isItemCod: false,
            fragile: false,
          },
        ]),
        cache: 'no-store',
      })
    }

    if (!response.ok) throw new Error(`Fez order request failed with ${response.status}`)

    const payload = asRecord(await response.json())
    const orderNos = payload.orderNos

    if (Array.isArray(orderNos) && orderNos[0]) return String(orderNos[0])
    if (orderNos && typeof orderNos === 'object') {
      const firstOrderNo = Object.values(orderNos as UnknownRecord)[0]
      if (firstOrderNo) return String(firstOrderNo)
    }
    if (payload.orderNo) return String(payload.orderNo)
    if (payload.waybillNumber) return String(payload.waybillNumber)

    throw new Error('Fez order response did not include an order number')
  } catch (err) {
    console.error('Fez order creation failed:', err)
    throw err
  }
}

export async function trackFezOrder(orderNumber: string) {
  const { baseUrl, secretKey } = getFezConfig()
  const cleanOrderNumber = orderNumber.trim()

  if (!cleanOrderNumber) throw new Error('Fez order number is required for tracking')
  if (!secretKey) throw new Error('FEZ_SECRET_KEY is not configured; order cannot be tracked')

  const headers = await getFezHeaders()
  const response = await fetchWithTimeout(`${baseUrl}/order/track/${encodeURIComponent(cleanOrderNumber)}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  const payload = asRecord(await response.json())
  if (!response.ok || payload.status === 'Error') {
    throw new Error(asString(payload.description) || `Fez tracking request failed with ${response.status}`)
  }

  return payload
}

export async function fetchFezDeliveryTimeEstimate({
  state,
}: {
  state: string
}) {
  const { baseUrl, secretKey, pickUpState } = getFezConfig()

  if (!state.trim()) throw new Error('Delivery state is required for delivery time estimate')
  if (!secretKey) throw new Error('FEZ_SECRET_KEY is not configured; delivery time cannot be estimated')

  const body = {
    delivery_type: 'local',
    pick_up_state: normalizeNigeriaState(pickUpState),
    drop_off_state: normalizeNigeriaState(state),
  }

  const headers = await getFezHeaders()
  const response = await fetchWithTimeout(`${baseUrl}/delivery-time-estimate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const payload = asRecord(await response.json())
  if (!response.ok || payload.status === 'Error') {
    throw new Error(asString(payload.description) || `Fez delivery estimate request failed with ${response.status}`)
  }

  const data = asRecord(payload.data)
  const eta = asString(data.eta)
  if (!eta) throw new Error('Fez delivery estimate response did not include an ETA')

  return { eta, payload }
}

export async function fetchFezStates() {
  const { baseUrl, secretKey } = getFezConfig()

  if (!secretKey) throw new Error('FEZ_SECRET_KEY is not configured; Fez states cannot be fetched')

  const headers = await getFezHeaders()
  const response = await fetchWithTimeout(`${baseUrl}/states`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  const payload = asRecord(await response.json())
  if (!response.ok || payload.status === 'Error') {
    throw new Error(asString(payload.description) || `Fez states request failed with ${response.status}`)
  }

  const states = Array.isArray(payload.states)
    ? payload.states
        .map((state): FezState | null => {
          const record = asRecord(state)
          const id = asNumber(record.id)
          const name = asString(record.state)

          return id && name ? { id, state: name } : null
        })
        .filter((state): state is FezState => Boolean(state))
    : []

  if (!states.length) throw new Error('Fez states response did not include states')

  return states
}

export async function fetchFezPickupHubs(state: string) {
  const { baseUrl, secretKey } = getFezConfig()

  if (!state.trim()) throw new Error('State is required to fetch Fez pickup hubs')
  if (!secretKey) throw new Error('FEZ_SECRET_KEY is not configured; pickup hubs cannot be fetched')

  const states = await fetchFezStates()
  const normalizedState = normalizeNigeriaState(state).toLowerCase()
  const fezState = states.find((item) => item.state.toLowerCase() === normalizedState)

  if (!fezState) throw new Error(`Fez does not have a state ID for ${state}`)

  const headers = await getFezHeaders()
  const response = await fetchWithTimeout(`${baseUrl}/hubs/${encodeURIComponent(String(fezState.id))}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  const payload = asRecord(await response.json())
  if (!response.ok || payload.status === 'Error') {
    throw new Error(asString(payload.description) || `Fez pickup hubs request failed with ${response.status}`)
  }

  const hubs = Array.isArray(payload.hubs)
    ? payload.hubs
        .map((hub): FezHub | null => {
          const record = asRecord(hub)
          const id = asNumber(record.id)
          const name = asString(record.name)
          const address = asString(record.address)

          return id && name ? { id, name, address } : null
        })
        .filter((hub): hub is FezHub => Boolean(hub))
    : []

  return { state: fezState, hubs }
}
