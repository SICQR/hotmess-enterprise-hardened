import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Shield } from '@phosphor-icons/react'

const AGE_GATE_COOKIE = 'age_verified'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; Secure; SameSite=Lax`;
}

interface AgeGateProps {
  onAccept?: () => void;
}

export function AgeGate({ onAccept }: AgeGateProps = {}) {
  const [open, setOpen] = useState(false)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    const verified = getCookie(AGE_GATE_COOKIE)
    if (!verified) {
      setOpen(true)
    }
  }, [])

  const handleVerify = () => {
    setCookie(AGE_GATE_COOKIE, 'true', 31536000) // 1 year
    setOpen(false)
    if (onAccept) {
      onAccept()
    }
  }

  const handleDeny = () => {
    setDenied(true)
  }

  if (denied) {
    return (
      <Dialog open={true}>
        <DialogContent 
          className="bg-card border-3 border-destructive max-w-md"
          aria-labelledby="age-gate-denied-title"
          aria-describedby="age-gate-denied-description"
        >
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Shield size={64} weight="duotone" className="text-destructive" aria-hidden="true" />
            </div>
            <DialogTitle id="age-gate-denied-title" className="text-2xl text-center">ACCESS DENIED</DialogTitle>
            <DialogDescription id="age-gate-denied-description" className="text-center text-lg mt-4">
              You must be 18 or older to access HOTMESS Enterprise.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Close this tab to exit.
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open}>
      <DialogContent 
        className="bg-card border-3 border-accent max-w-md" 
        onInteractOutside={(e) => e.preventDefault()}
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
      >
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <ShieldCheck size={64} weight="duotone" className="text-accent" aria-hidden="true" />
          </div>
          <DialogTitle id="age-gate-title" className="text-3xl text-center">AGE VERIFICATION</DialogTitle>
          <DialogDescription id="age-gate-description" className="text-center text-lg mt-4">
            HOTMESS Enterprise is a luxury lifestyle platform for men 18+.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleVerify}
            className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label="I am 18 or older - Enter the site"
          >
            I AM 18 OR OLDER
          </Button>
          <Button 
            onClick={handleDeny}
            variant="outline"
            className="w-full h-14 text-lg border-2 border-muted-foreground/20 hover:border-destructive hover:text-destructive"
            aria-label="I am under 18 - Exit the site"
          >
            I AM UNDER 18
          </Button>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          By entering, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  )
}
