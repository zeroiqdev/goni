import { NextResponse } from 'next/server'
import { fetchFezDeliveryCost, normalizeNigeriaState } from '@/lib/delivery'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { state?: string; weight?: number }
    const state = body.state || ''
    const weight = Number(body.weight || 0)

    if (!state.trim()) {
      return NextResponse.json({ error: 'State is required' }, { status: 400 })
    }

    const { fee } = await fetchFezDeliveryCost({
      state,
      weight: Number.isFinite(weight) ? weight : 0,
    })

    return NextResponse.json({
      shippingFee: fee,
      state: normalizeNigeriaState(state),
    })
  } catch (err) {
    console.error('Delivery cost proxy failed:', err)
    return NextResponse.json({
      shippingFee: null,
      unavailable: true,
      error: err instanceof Error ? err.message : 'Could not calculate delivery fee. Please confirm your delivery state and try again.',
    })
  }
}
