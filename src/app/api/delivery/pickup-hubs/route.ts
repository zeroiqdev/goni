import { NextResponse } from 'next/server'
import { fetchFezPickupHubs } from '@/lib/delivery'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state') || ''

    if (!state.trim()) {
      return NextResponse.json({ error: 'State is required' }, { status: 400 })
    }

    const { state: fezState, hubs } = await fetchFezPickupHubs(state)

    return NextResponse.json({
      state: fezState,
      hubs,
    })
  } catch (err) {
    console.error('Pickup hubs proxy failed:', err)
    return NextResponse.json({
      hubs: [],
      unavailable: true,
      error: 'Could not fetch Fez pickup hubs for this state.',
    })
  }
}
