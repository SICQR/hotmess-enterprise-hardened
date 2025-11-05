import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Download, CheckCircle, Rocket, Lightning, Package, Calendar, CurrencyDollar } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { testWebhookConnection, WebhookEvent } from '@/lib/webhooks'

interface BlueprintsPageProps {
  onNavigate: (route: string) => void
}

interface Blueprint {
  id: string
  name: string
  description: string
  icon: any
  event: WebhookEvent
  triggers: string[]
  actions: string[]
  status: 'available' | 'popular' | 'new'
  jsonFile: string
}

const blueprints: Blueprint[] = [
  {
    id: 'affiliate-conversion-tracker',
    name: 'Affiliate Conversion Tracker',
    description: 'Automatically track affiliate conversions, log to Google Sheets, update Airtable, and send Slack notifications when milestones are hit.',
    icon: CurrencyDollar,
    event: 'conversion.completed',
    triggers: ['New scan event from shortlink router', 'Product purchase detected'],
    actions: ['Log to Google Sheets', 'Update Airtable affiliate stats', 'Send Slack notification', 'Trigger email via SendGrid'],
    status: 'popular',
    jsonFile: 'affiliate-conversion-tracker.json'
  },
  {
    id: 'care-checkin-escalation',
    name: 'Care Check-In Escalation',
    description: 'Automatically escalate low mood scores to support team via SMS, create tickets in Notion, and schedule follow-ups.',
    icon: Lightning,
    event: 'checkin.submitted',
    triggers: ['Care check-in with mood score <4'],
    actions: ['Create Notion ticket', 'Send SMS via Twilio', 'Log to crisis database', 'Schedule follow-up reminder'],
    status: 'popular',
    jsonFile: 'care-checkin-escalation.json'
  },
  {
    id: 'product-sync-pipeline',
    name: 'Product Sync Pipeline',
    description: 'Sync Shopify products to Airtable, generate images, and auto-publish to social media when products are updated.',
    icon: Package,
    event: 'product.updated',
    triggers: ['Shopify product updated or created'],
    actions: ['Update Airtable database', 'Generate product images', 'Post to Instagram', 'Update search index'],
    status: 'available',
    jsonFile: 'product-sync-pipeline.json'
  },
  {
    id: 'radio-show-scheduler',
    name: 'Radio Show Scheduler',
    description: 'Automatically start streams, send push notifications to subscribers, and post to social media when shows begin.',
    icon: Calendar,
    event: 'show.started',
    triggers: ['Schedule time matches show start'],
    actions: ['Start stream with metadata', 'Send push notifications', 'Update Now Playing', 'Post to Twitter/X'],
    status: 'new',
    jsonFile: 'radio-show-scheduler.json'
  },
  {
    id: 'referral-payout-calculator',
    name: 'Referral Payout Calculator',
    description: 'Monthly automated payout calculation, CSV generation, PayPal batch payments, and email statements to affiliates.',
    icon: Rocket,
    event: 'affiliate.milestone',
    triggers: ['End of month (scheduled)'],
    actions: ['Calculate earnings', 'Generate payout CSV', 'Send PayPal payment', 'Email affiliates'],
    status: 'available',
    jsonFile: 'referral-payout-calculator.json'
  }
]

export function BlueprintsPage({ onNavigate }: BlueprintsPageProps) {
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null)
  const [webhookUrls, setWebhookUrls] = useState<Record<string, string>>({})

  const handleDownloadBlueprint = (blueprint: Blueprint) => {
    const blueprintData = {
      name: blueprint.name,
      description: blueprint.description,
      version: '1.0.0',
      event: blueprint.event,
      webhook: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-HOTMESS-Signature': '{{signature}}',
          'X-HOTMESS-Event': blueprint.event
        },
        body: {
          event: blueprint.event,
          timestamp: '{{timestamp}}',
          data: '{{data}}',
          metadata: '{{metadata}}'
        }
      },
      modules: blueprint.actions.map((action, index) => ({
        id: index + 1,
        module: action,
        version: 1
      }))
    }

    const blob = new Blob([JSON.stringify(blueprintData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = blueprint.jsonFile
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`Downloaded ${blueprint.name} blueprint`)
  }

  const handleTestWebhook = async (blueprint: Blueprint) => {
    setTestingWebhook(blueprint.id)
    
    try {
      const success = await testWebhookConnection(blueprint.event)
      
      if (success) {
        toast.success(`Webhook test successful for ${blueprint.name}`)
      } else {
        toast.error(`No webhook URL configured for ${blueprint.event}. Add it to your .env file.`)
      }
    } catch (error) {
      toast.error('Webhook test failed')
    } finally {
      setTestingWebhook(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold tracking-wider">MAKE.COM BLUEPRINTS</h1>
          <Badge variant="secondary" className="ml-auto">MVP FIVE</Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <Rocket size={64} weight="duotone" className="text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">AUTOMATE HOTMESS</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pre-built Make.com scenarios for common operations. Download, import to Make.com, and connect your webhook URLs.
          </p>
        </div>

        <Card className="p-8 border-2 border-accent mb-12 bg-accent/5">
          <h3 className="text-2xl font-bold mb-4">Quick Setup</h3>
          <ol className="space-y-4 text-lg">
            <li className="flex gap-4">
              <span className="text-accent font-bold">1.</span>
              <span>Download the blueprint JSON file below</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">2.</span>
              <span>Create a scenario in Make.com and import the JSON</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">3.</span>
              <span>Copy the webhook URL from Make.com</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">4.</span>
              <span>Add to your .env file (VITE_MAKE_WEBHOOK_[EVENT])</span>
            </li>
            <li className="flex gap-4">
              <span className="text-accent font-bold">5.</span>
              <span>Test the connection using the test button</span>
            </li>
          </ol>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          {blueprints.map((blueprint) => {
            const Icon = blueprint.icon
            return (
              <Card key={blueprint.id} className="p-8 border-2 border-border hover:border-accent transition-all">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <Icon size={48} weight="duotone" className="text-accent" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{blueprint.name}</h3>
                        <p className="text-muted-foreground">{blueprint.description}</p>
                      </div>
                      {blueprint.status === 'popular' && (
                        <Badge className="bg-accent text-accent-foreground">POPULAR</Badge>
                      )}
                      {blueprint.status === 'new' && (
                        <Badge variant="secondary">NEW</Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2">Triggers</h4>
                        <ul className="space-y-1">
                          {blueprint.triggers.map((trigger, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle size={16} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
                              <span>{trigger}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2">Actions</h4>
                        <ul className="space-y-1">
                          {blueprint.actions.map((action, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle size={16} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleDownloadBlueprint(blueprint)}
                        className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <Download size={20} className="mr-2" />
                        DOWNLOAD BLUEPRINT
                      </Button>
                      
                      <Button
                        onClick={() => handleTestWebhook(blueprint)}
                        disabled={testingWebhook === blueprint.id}
                        variant="outline"
                        className="h-12 border-2"
                      >
                        {testingWebhook === blueprint.id ? 'TESTING...' : 'TEST CONNECTION'}
                      </Button>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground font-mono">
                        Event: {blueprint.event}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="mt-12 p-8 border-2 border-border">
          <h3 className="text-2xl font-bold mb-4">Environment Variables</h3>
          <p className="text-muted-foreground mb-6">
            Add these to your .env file with your Make.com webhook URLs:
          </p>
          <div className="space-y-2 font-mono text-sm bg-card p-6 rounded-lg border border-border">
            <div>VITE_MAKE_WEBHOOK_SCAN_CREATED=https://hook.make.com/your-webhook-id</div>
            <div>VITE_MAKE_WEBHOOK_CHECKIN_SUBMITTED=https://hook.make.com/your-webhook-id</div>
            <div>VITE_MAKE_WEBHOOK_CONVERSION_COMPLETED=https://hook.make.com/your-webhook-id</div>
            <div>VITE_MAKE_WEBHOOK_PRODUCT_UPDATED=https://hook.make.com/your-webhook-id</div>
            <div>VITE_MAKE_WEBHOOK_SHOW_STARTED=https://hook.make.com/your-webhook-id</div>
            <div>VITE_MAKE_WEBHOOK_AFFILIATE_MILESTONE=https://hook.make.com/your-webhook-id</div>
            <div className="text-muted-foreground mt-4"># Optional: Webhook signature secret</div>
            <div>VITE_WEBHOOK_SECRET=your-secret-key-here</div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Check the{' '}
            <a
              href="https://www.make.com/en/help/scenarios/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Make.com webhook documentation
            </a>
            {' '}or contact support.
          </p>
        </div>
      </div>
    </div>
  )
}
