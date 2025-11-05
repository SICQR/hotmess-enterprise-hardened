import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Heart, Phone } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { sendWebhook } from '@/lib/webhooks'
import { checkRateLimit } from '@/lib/rate-limiter'
import { careCheckinSchema, sanitizeInput } from '@/lib/validation'

interface CarePageProps {
  onNavigate: (route: string) => void
}

export function CarePage({ onNavigate }: CarePageProps) {
  const [mood, setMood] = useState([5])
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!checkRateLimit('care-checkin', 5, 60000)) {
      toast.error('Please wait a moment before submitting another check-in')
      return
    }

    const validation = careCheckinSchema.safeParse({
      mood: mood[0],
      message: message || undefined
    })

    if (!validation.success) {
      toast.error('Invalid input. Please check your entries.')
      return
    }

    const sanitizedMessage = message ? sanitizeInput(message) : null

    setSubmitting(true)
    
    try {
      await supabase.from('checkins').insert({
        mood_score: mood[0],
        message: sanitizedMessage,
        created_at: new Date().toISOString()
      })
      
      if (mood[0] < 4) {
        await supabase.rpc('escalate_checkin', {
          mood_score: mood[0],
          message: sanitizedMessage
        })
      }

      await sendWebhook('checkin.submitted', {
        mood_score: mood[0],
        message: sanitizedMessage,
        requires_escalation: mood[0] < 4
      }, {
        source: 'care_page'
      })
      
      toast.success('Check-in submitted. Thank you for sharing.')
      setMood([5])
      setMessage('')
    } catch (error) {
      toast.error('Failed to submit check-in')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  const showCrisisResources = mood[0] < 4

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            size="icon"
            aria-label="Go back to home"
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </Button>
          <h1 className="text-2xl font-bold tracking-wider">HOTMESS CARE</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <Heart size={64} weight="duotone" className="text-accent mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-4xl font-bold mb-4">HOW ARE YOU TODAY?</h2>
          <p className="text-lg text-muted-foreground">
            Your mental health matters. Check in with yourself.
          </p>
        </div>

        <Card className="p-8 border-2 border-border space-y-8">
          <div>
            <label htmlFor="mood-slider" className="block text-lg font-bold mb-4">
              Rate your mood (1 = struggling, 10 = excellent)
            </label>
            <div className="space-y-4">
              <Slider
                id="mood-slider"
                value={mood}
                onValueChange={setMood}
                min={1}
                max={10}
                step={1}
                className="w-full"
                aria-label="Mood rating from 1 to 10"
                aria-valuemin={1}
                aria-valuemax={10}
                aria-valuenow={mood[0]}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Struggling</span>
                <span className="text-3xl font-bold text-foreground" aria-live="polite">{mood[0]}</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="mood-message" className="block text-lg font-bold mb-4">
              Want to share more? (optional)
            </label>
            <Textarea
              id="mood-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind..."
              className="min-h-32"
              maxLength={500}
              aria-label="Optional message about how you're feeling"
            />
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {message.length}/500
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            size="lg"
            className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label={submitting ? 'Submitting check-in' : 'Submit check-in'}
          >
            {submitting ? 'Submitting...' : 'SUBMIT CHECK-IN'}
          </Button>
        </Card>

        {showCrisisResources && (
          <Card className="mt-8 p-8 border-2 border-destructive bg-destructive/10" role="alert" aria-live="polite">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Phone size={32} weight="duotone" aria-hidden="true" />
              Crisis Resources
            </h3>
            <p className="text-lg mb-6">
              If you're in crisis or thinking about self-harm, please reach out for immediate support.
            </p>
            <div className="space-y-4 text-lg">
              <div>
                <div className="font-bold">National Suicide Prevention Lifeline</div>
                <a href="tel:988" className="text-accent hover:underline">988 (call or text)</a>
              </div>
              <div>
                <div className="font-bold">Crisis Text Line</div>
                <a href="sms:741741" className="text-accent hover:underline">Text HOME to 741741</a>
              </div>
              <div>
                <div className="font-bold">Veterans Crisis Line</div>
                <a href="tel:1-800-273-8255" className="text-accent hover:underline">1-800-273-8255 (press 1)</a>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              These services are free, confidential, and available 24/7.
            </p>
          </Card>
        )}

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            HOTMESS provides peer support but is not a substitute for professional mental health care.
            If you're experiencing a crisis, please contact emergency services or a crisis hotline.
          </p>
          <p className="mt-4">
            All check-ins are confidential and used only to improve our community support.
          </p>
        </div>
      </div>
    </div>
  )
}
