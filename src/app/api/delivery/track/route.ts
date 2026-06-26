import { NextResponse } from 'next/server'
import { trackFezOrder } from '@/lib/delivery'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderNumber = searchParams.get('orderNumber') || ''

    if (!orderNumber.trim()) {
      return NextResponse.json({ error: 'Fez order number is required' }, { status: 400 })
    }

    const tracking = await trackFezOrder(orderNumber)

    return NextResponse.json(tracking)
  } catch (err) {
    console.error('Fez tracking proxy failed:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Could not track this delivery.' },
      { status: 503 },
    )
  }
}
