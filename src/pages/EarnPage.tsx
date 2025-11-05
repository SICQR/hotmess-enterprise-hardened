import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Copy, TrendUp } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { getLeaderboard, getTierColor, getTierIcon, type AffiliateStats } from '@/lib/analytics'
import { generateHMAC } from '@/lib/hmac'

interface EarnPageProps {
  onNavigate: (route: string) => void
}

export function EarnPage({ onNavigate }: EarnPageProps) {
  const [leaderboard, setLeaderboard] = useState<AffiliateStats[]>([])
  const [referralLink, setReferralLink] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const data = await getLeaderboard()
    setLeaderboard(data)
    
    const mockUserId = 'user_' + Math.random().toString(36).slice(2, 9)
    const payload = `shop?aff=${mockUserId}`
    const signature = await generateHMAC(payload)
    const link = `${window.location.origin}/r?p=shop&aff=${mockUserId}&sig=${signature}`
    setReferralLink(link)
    
    setLoading(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard')
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
          <h1 className="text-2xl font-bold tracking-wider">EARN WITH HOTMESS</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <TrendUp size={64} weight="duotone" className="text-accent mx-auto mb-4" />
            <h2 className="text-5xl font-bold mb-4">GET PAID TO SHARE</h2>
            <p className="text-xl text-muted-foreground">
              Earn commissions by referring friends to HOTMESS products and services.
            </p>
          </div>

          <Card className="p-8 border-2 border-accent">
            <h3 className="text-2xl font-bold mb-4">YOUR REFERRAL LINK</h3>
            <p className="text-muted-foreground mb-6">
              Share this link on social media, with friends, or anywhere online.
              You'll earn 10% on every purchase made through your link.
            </p>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Generating link...</div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={copyLink}
                  size="icon"
                  className="flex-shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Copy size={20} />
                </Button>
              </div>
            )}
          </Card>

          <div>
            <h3 className="text-3xl font-bold mb-6">TIER SYSTEM</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6 border-2 border-gray-500">
                <div className="text-4xl mb-2">⚙️</div>
                <h4 className="text-xl font-bold mb-2">IRON</h4>
                <p className="text-sm text-muted-foreground">
                  0-50 conversions<br />10% commission
                </p>
              </Card>
              <Card className="p-6 border-2 border-orange-400">
                <div className="text-4xl mb-2">🔥</div>
                <h4 className="text-xl font-bold mb-2">BRONZE</h4>
                <p className="text-sm text-muted-foreground">
                  51-150 conversions<br />12% commission
                </p>
              </Card>
              <Card className="p-6 border-2 border-gray-300">
                <div className="text-4xl mb-2">⚡</div>
                <h4 className="text-xl font-bold mb-2">SILVER</h4>
                <p className="text-sm text-muted-foreground">
                  151-300 conversions<br />15% commission
                </p>
              </Card>
              <Card className="p-6 border-2 border-gold">
                <div className="text-4xl mb-2">👑</div>
                <h4 className="text-xl font-bold mb-2">GOLD</h4>
                <p className="text-sm text-muted-foreground">
                  300+ conversions<br />20% commission
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6">LEADERBOARD</h3>
            <Card className="border-2 border-border">
              <div className="divide-y divide-border">
                {leaderboard.map((affiliate, idx) => (
                  <div key={affiliate.userId} className="p-6 flex items-center gap-6">
                    <div className="text-3xl font-bold text-muted-foreground w-12">
                      #{idx + 1}
                    </div>
                    <div className="text-2xl">
                      {getTierIcon(affiliate.tier)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-xl font-bold">{affiliate.username}</h4>
                        <Badge className={getTierColor(affiliate.tier)}>
                          {affiliate.tier.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {affiliate.totalConversions} conversions • {affiliate.totalScans} scans
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        ${affiliate.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">total earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-8 border-2 border-border">
            <h3 className="text-2xl font-bold mb-4">HOW IT WORKS</h3>
            <ol className="space-y-3 text-lg">
              <li className="flex gap-3">
                <span className="font-bold text-accent">1.</span>
                <span>Share your unique referral link with your network</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-accent">2.</span>
                <span>Your friends shop, order rides, or subscribe to services</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-accent">3.</span>
                <span>You earn commission on every conversion</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-accent">4.</span>
                <span>Level up tiers to earn higher commission rates</span>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  )
}
