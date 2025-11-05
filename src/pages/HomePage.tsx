import { useState } from 'react'
import { WeatherStrip } from '@/components/WeatherStrip'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Hero } from '@/components/Hero'
import SplashScreen from '@/components/SplashScreen'
import { Radio, ShoppingBag, CurrencyDollar, QrCode, Heart } from '@phosphor-icons/react'

interface HomePageProps {
  onNavigate: (route: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      
      <WeatherStrip />
      
      <nav className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wider">HOTMESS</h1>
          <div className="flex gap-6">
            <button onClick={() => onNavigate('radio')} className="hover:text-accent transition-colors">
              RADIO
            </button>
            <button onClick={() => onNavigate('shop')} className="hover:text-accent transition-colors">
              SHOP
            </button>
            <button onClick={() => onNavigate('earn')} className="hover:text-accent transition-colors">
              EARN
            </button>
            <button onClick={() => onNavigate('care')} className="hover:text-accent transition-colors">
              CARE
            </button>
            <button onClick={() => onNavigate('showcase')} className="hover:text-accent transition-colors">
              SHOWCASE
            </button>
          </div>
        </div>
      </nav>

      <Hero onNavigate={onNavigate} />

      <section className="bg-card border-y-2 border-border py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">WHAT WE OFFER</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-2 border-border hover:border-accent transition-colors cursor-pointer" onClick={() => onNavigate('radio')}>
              <Radio size={40} weight="duotone" className="text-accent mb-4" />
              <h4 className="text-xl font-bold mb-2">LIVE RADIO</h4>
              <p className="text-sm text-muted-foreground">
                24/7 underground music from the best DJs worldwide.
              </p>
            </Card>
            
            <Card className="p-6 border-2 border-border hover:border-accent transition-colors cursor-pointer" onClick={() => onNavigate('shop')}>
              <ShoppingBag size={40} weight="duotone" className="text-accent mb-4" />
              <h4 className="text-xl font-bold mb-2">LUXURY GOODS</h4>
              <p className="text-sm text-muted-foreground">
                Brutalist apparel and accessories for modern men.
              </p>
            </Card>
            
            <Card className="p-6 border-2 border-border hover:border-accent transition-colors cursor-pointer" onClick={() => onNavigate('earn')}>
              <CurrencyDollar size={40} weight="duotone" className="text-accent mb-4" />
              <h4 className="text-xl font-bold mb-2">EARN PROGRAM</h4>
              <p className="text-sm text-muted-foreground">
                Get paid for sharing HOTMESS with your network.
              </p>
            </Card>
            
            <Card className="p-6 border-2 border-border hover:border-accent transition-colors cursor-pointer" onClick={() => onNavigate('care')}>
              <Heart size={40} weight="duotone" className="text-accent mb-4" />
              <h4 className="text-xl font-bold mb-2">CARE CHECK-IN</h4>
              <p className="text-sm text-muted-foreground">
                Mental health support for the community.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <QrCode size={80} weight="duotone" className="mx-auto text-accent mb-6" />
          <h3 className="text-3xl font-bold mb-4">SCAN TO CONNECT</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Find HOTMESS QR codes on products, posters, and packaging.<br />
            Each scan supports creators and unlocks exclusive content.
          </p>
          <Button
            onClick={() => onNavigate('earn')}
            size="lg"
            variant="outline"
            className="border-2"
          >
            GET YOUR QR CODE
          </Button>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">HOTMESS</h4>
              <p className="text-sm text-muted-foreground">
                Brutalist luxury editorial platform for modern men.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm">EXPLORE</h5>
              <div className="space-y-2 text-sm">
                <button onClick={() => onNavigate('radio')} className="block hover:text-accent">Radio</button>
                <button onClick={() => onNavigate('shop')} className="block hover:text-accent">Shop</button>
                <button onClick={() => onNavigate('earn')} className="block hover:text-accent">Earn</button>
                <button onClick={() => onNavigate('care')} className="block hover:text-accent">Care</button>
                <button onClick={() => onNavigate('blueprints')} className="block hover:text-accent">Blueprints</button>
                <button onClick={() => onNavigate('showcase')} className="block hover:text-accent">Design Showcase</button>
                <button onClick={() => onNavigate('shipkit')} className="block hover:text-accent">Ship Kit</button>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm">LEGAL</h5>
              <div className="space-y-2 text-sm">
                <button onClick={() => onNavigate('privacy')} className="block hover:text-accent">Privacy Policy</button>
                <button onClick={() => onNavigate('terms')} className="block hover:text-accent">Terms of Service</button>
                <button onClick={() => onNavigate('cookies')} className="block hover:text-accent">Cookie Policy</button>
                <button onClick={() => onNavigate('accessibility')} className="block hover:text-accent">Accessibility</button>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-sm">CONNECT</h5>
              <p className="text-sm text-muted-foreground">
                © 2024 HOTMESS Enterprise.<br />All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
