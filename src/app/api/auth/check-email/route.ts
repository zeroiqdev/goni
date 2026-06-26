import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string }
    const email = (body.email || '').trim().toLowerCase()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    return NextResponse.json({ exists: result.totalDocs > 0 })
  } catch (err) {
    console.error('Check email failed:', err)
    return NextResponse.json({ error: 'Could not check email' }, { status: 500 })
  }
}
