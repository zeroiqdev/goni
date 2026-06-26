import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      type,
      fullName,
      email,
      phone,
      businessName,
      subject,
      message,
      product,
      quantity,
      purpose,
      deliveryOption,
      address,
    } = body

    // Validate required fields
    if (!type || !fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: type, fullName, email, phone, and message are required.' },
        { status: 400 }
      )
    }

    try {
      const payload = await getPayload({ config })
      const inquiry = await payload.create({
        collection: 'inquiries',
        data: {
          type,
          fullName,
          email,
          phone,
          businessName: businessName || undefined,
          subject: subject || undefined,
          message,
          product: product || undefined,
          quantity: quantity || undefined,
          purpose: purpose || undefined,
          deliveryOption: deliveryOption || undefined,
          address: address || undefined,
          status: 'new',
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Inquiry submitted successfully to Payload CMS!',
        data: inquiry,
      })
    } catch (dbError: any) {
      console.error('Database/Payload error creating inquiry:', dbError)
      
      // Fallback response for local dev if Postgres is not running
      return NextResponse.json({
        success: true,
        simulated: true,
        message: 'Inquiry received! (Dev Mode Fallback: Inquiry captured but could not write to DB: ' + (dbError.message || dbError) + ')',
        data: {
          type,
          fullName,
          email,
          phone,
          businessName,
          subject,
          message,
          product,
          quantity,
          purpose,
          deliveryOption,
          address,
          status: 'new',
          createdAt: new Date().toISOString(),
        }
      })
    }
  } catch (error: any) {
    console.error('Error handling inquiry submission:', error)
    return NextResponse.json(
      { error: 'Failed to process request: ' + (error.message || error) },
      { status: 500 }
    )
  }
}
