const DEFAULT_PAYSTACK_BASE_URL = 'https://api.paystack.co'

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as UnknownRecord) : {}
}

function getPaystackConfig() {
  return {
    baseUrl: (process.env.PAYSTACK_BASE_URL || DEFAULT_PAYSTACK_BASE_URL).replace(/\/$/, ''),
    secretKey: process.env.PAYSTACK_SECRET_KEY,
  }
}

function getPaystackHeaders() {
  const { secretKey } = getPaystackConfig()

  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured')
  }

  return {
    Authorization: `Bearer ${secretKey}`,
    'Content-Type': 'application/json',
  }
}

export async function initializePaystackTransaction({
  amount,
  email,
  reference,
  callbackUrl,
  metadata,
}: {
  amount: number
  email: string
  reference: string
  callbackUrl: string
  metadata?: Record<string, unknown>
}) {
  const { baseUrl } = getPaystackConfig()
  const response = await fetch(`${baseUrl}/transaction/initialize`, {
    method: 'POST',
    headers: getPaystackHeaders(),
    body: JSON.stringify({
      amount: String(Math.round(amount * 100)),
      email,
      currency: 'NGN',
      reference,
      callback_url: callbackUrl,
      metadata,
    }),
    cache: 'no-store',
  })

  const payload = asRecord(await response.json())
  if (!response.ok || payload.status !== true) {
    throw new Error(String(payload.message || `Paystack initialize failed with ${response.status}`))
  }

  const data = asRecord(payload.data)
  const authorizationUrl = data.authorization_url

  if (typeof authorizationUrl !== 'string') {
    throw new Error('Paystack initialize response did not include an authorization URL')
  }

  return {
    authorizationUrl,
    accessCode: String(data.access_code || ''),
    reference: String(data.reference || reference),
  }
}

export async function verifyPaystackTransaction(reference: string) {
  const { baseUrl } = getPaystackConfig()
  const response = await fetch(`${baseUrl}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: getPaystackHeaders(),
    cache: 'no-store',
  })

  const payload = asRecord(await response.json())
  if (!response.ok || payload.status !== true) {
    throw new Error(String(payload.message || `Paystack verify failed with ${response.status}`))
  }

  const data = asRecord(payload.data)

  return {
    status: String(data.status || ''),
    amount: typeof data.amount === 'number' ? data.amount / 100 : 0,
    currency: String(data.currency || ''),
    paidAt: typeof data.paid_at === 'string' ? data.paid_at : undefined,
    reference: String(data.reference || reference),
  }
}
