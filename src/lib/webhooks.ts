export type WebhookEvent = 
  | 'scan.created'
  | 'checkin.submitted'
  | 'conversion.completed'
  | 'product.updated'
  | 'show.started'
  | 'affiliate.milestone'

export interface WebhookPayload {
  event: WebhookEvent
  timestamp: string
  data: Record<string, any>
  metadata?: {
    userId?: string
    affiliateId?: string
    source?: string
  }
}

async function generateSignature(data: Record<string, any>): Promise<string> {
  const message = JSON.stringify(data)
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(message)
  
  const key = import.meta.env.VITE_WEBHOOK_SECRET || 'hotmess-default-secret'
  const keyBuffer = encoder.encode(key)
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer)
  
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function getWebhookUrl(event: WebhookEvent): string | undefined {
  const eventKey = event.toUpperCase().replace('.', '_')
  return import.meta.env[`VITE_MAKE_WEBHOOK_${eventKey}`]
}

export async function sendWebhook(
  event: WebhookEvent,
  data: Record<string, any>,
  metadata?: WebhookPayload['metadata']
): Promise<boolean> {
  const webhookUrl = getWebhookUrl(event)
  if (!webhookUrl) {
    console.warn(`No webhook configured for event: ${event}`)
    return false
  }

  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data,
    metadata
  }

  try {
    const signature = await generateSignature(payload.data)
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-HOTMESS-Signature': signature,
        'X-HOTMESS-Event': event
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error(`Webhook failed for ${event}: ${response.status}`)
      return false
    }

    console.log(`Webhook sent successfully: ${event}`)
    return true
  } catch (error) {
    console.error(`Webhook failed for ${event}:`, error)
    return false
  }
}

export function testWebhookConnection(event: WebhookEvent): Promise<boolean> {
  return sendWebhook(event, { test: true, message: 'Connection test' }, { source: 'test' })
}
