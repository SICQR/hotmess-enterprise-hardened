import { useState } from 'react'
import { AgeGate } from '@/components/AgeGate'
import { BrandShowcase } from '@/components/BrandShowcase'
import { ConciergeWidget } from '@/components/ConciergeWidget'
import { HomePage } from '@/pages/HomePage'
import { RadioPage } from '@/pages/RadioPage'
import { ShopPage } from '@/pages/ShopPage'
import { CarePage } from '@/pages/CarePage'
import { EarnPage } from '@/pages/EarnPage'
import { ShortlinkRouter } from '@/pages/ShortlinkRouter'
import { ShipKitPage } from '@/pages/ShipKitPage'
import { LegalPage } from '@/pages/LegalPage'
import { BlueprintsPage } from '@/pages/BlueprintsPage'
import { Toaster } from '@/components/ui/sonner'
import { useGlobalShortcuts } from '@/hooks/use-keyboard-shortcuts'

type Route = 'home' | 'radio' | 'shop' | 'care' | 'earn' | 'blueprints' | 'showcase' | 'shipkit' | 'r' | 'privacy' | 'terms' | 'cookies' | 'accessibility'

function App() {
  const [route, setRoute] = useState<Route>('home')
  
  const navigate = (newRoute: string) => {
    setRoute(newRoute as Route)
  }
  
  useGlobalShortcuts(navigate)
  
  const renderPage = () => {
    switch (route) {
      case 'home':
        return <HomePage onNavigate={navigate} />
      case 'radio':
        return <RadioPage onNavigate={navigate} />
      case 'shop':
        return <ShopPage onNavigate={navigate} />
      case 'care':
        return <CarePage onNavigate={navigate} />
      case 'earn':
        return <EarnPage onNavigate={navigate} />
      case 'blueprints':
        return <BlueprintsPage onNavigate={navigate} />
      case 'showcase':
        return <BrandShowcase />
      case 'shipkit':
        return <ShipKitPage onNavigate={navigate} />
      case 'r':
        return <ShortlinkRouter />
      case 'privacy':
        return <LegalPage type="privacy" onNavigate={navigate} />
      case 'terms':
        return <LegalPage type="terms" onNavigate={navigate} />
      case 'cookies':
        return <LegalPage type="cookies" onNavigate={navigate} />
      case 'accessibility':
        return <LegalPage type="accessibility" onNavigate={navigate} />
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded">
        Skip to main content
      </a>
      <AgeGate />
      <main id="main-content">
        {renderPage()}
      </main>
      <ConciergeWidget />
      <Toaster />
    </>
  )
}

export default App
