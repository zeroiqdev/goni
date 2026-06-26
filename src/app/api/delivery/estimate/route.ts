import { NextResponse } from 'next/server'
import { fetchFezDeliveryTimeEstimate, normalizeNigeriaState } from '@/lib/delivery'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { state?: string }
    const state = body.state || ''

    if (!state.trim()) {
      return NextResponse.json({ error: 'State is required' }, { status: 400 })
    }

    const { eta } = await fetchFezDeliveryTimeEstimate({ state })

    return NextResponse.json({
      eta,
      state: normalizeNigeriaState(state),
    })
  } catch (err) {
    console.error('Delivery time estimate proxy failed:', err)
    return NextResponse.json({
      eta: null,
      unavailable: true,
      error: 'Could not estimate delivery time.',
    })
  }
}
