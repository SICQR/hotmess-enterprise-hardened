import { useEffect, useState } from 'react'
import { verifyHMAC, getDestination } from '@/lib/hmac'
import { trackScan } from '@/lib/analytics'
import { sendWebhook } from '@/lib/webhooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, CheckCircle } from '@phosphor-icons/react'

export function ShortlinkRouter() {
  const [status, setStatus] = useState<'verifying' | 'valid' | 'invalid'>('verifying')
  const [destination, setDestination] = useState<string>('')

  useEffect(() => {
    handleRedirect()
  }, [])

  async function handleRedirect() {
    const params = new URLSearchParams(window.location.search)
    const path = params.get('p')
    const sig = params.get('sig')
    const affId = params.get('aff')

    if (!path || !sig) {
      setStatus('invalid')
      return
    }

    const payload = `${path}${affId ? `?aff=${affId}` : ''}`
    const isValid = await verifyHMAC(payload, sig)

    if (!isValid) {
      setStatus('invalid')
      return
    }

    const dest = getDestination(path)
    
    if (!dest) {
      setStatus('invalid')
      return
    }

    await trackScan({
      shortlink: path,
      destination: dest.url,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      affiliateId: affId || undefined
    })

    await sendWebhook('scan.created', {
      shortlink: path,
      destination: dest.url,
      type: dest.type
    }, {
      affiliateId: affId || undefined,
      source: 'shortlink_router'
    })

    setDestination(dest.url)
    setStatus('valid')

    if (dest.type === 'shop' || dest.type === 'radio' || dest.type === 'external') {
      setTimeout(() => {
        window.location.href = dest.url
      }, 1500)
    } else {
      setTimeout(() => {
        window.location.href = dest.url
      }, 2000)
    }
  }

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 max-w-md text-center border-2 border-border">
          <div className="animate-pulse mb-6">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">VERIFYING LINK</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </Card>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 max-w-md text-center border-2 border-destructive">
          <XCircle size={64} weight="duotone" className="text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">INVALID LINK</h2>
          <p className="text-muted-foreground mb-8">
            This link is invalid or has expired.
            Please contact the person who shared it with you.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-2"
          >
            GO TO HOMEPAGE
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="p-12 max-w-md text-center border-2 border-accent">
        <CheckCircle size={64} weight="duotone" className="text-accent mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">VERIFIED</h2>
        <p className="text-muted-foreground mb-2">
          Redirecting you to
        </p>
        <p className="text-lg font-mono text-accent mb-8">
          {destination}
        </p>
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </Card>
    </div>
  )
}
