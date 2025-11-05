import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies' | 'accessibility'
  onNavigate: (route: string) => void
}

export function LegalPage({ type, onNavigate }: LegalPageProps) {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    accessibility: 'Accessibility Statement'
  }

  const content = {
    privacy: `
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly, including email, usage data, and preferences. Mock environment - no real data is collected.</p>
      
      <h2>2. How We Use Your Information</h2>
      <p>We use information to provide services, improve user experience, and communicate updates.</p>
      
      <h2>3. Data Sharing</h2>
      <p>We do not sell your personal information. We may share data with service providers necessary for operations.</p>
      
      <h2>4. Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information at any time.</p>
    `,
    terms: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing HOTMESS Enterprise, you agree to these terms of service.</p>
      
      <h2>2. User Conduct</h2>
      <p>Users must not engage in illegal activities, harassment, or misuse of services.</p>
      
      <h2>3. Intellectual Property</h2>
      <p>All content, logos, and materials are property of HOTMESS Enterprise and protected by copyright.</p>
      
      <h2>4. Limitation of Liability</h2>
      <p>HOTMESS Enterprise is not liable for indirect damages arising from use of services.</p>
    `,
    cookies: `
      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files stored on your device to enhance user experience.</p>
      
      <h2>2. How We Use Cookies</h2>
      <p>We use cookies for session management, analytics, and personalization.</p>
      
      <h2>3. Managing Cookies</h2>
      <p>You can control cookies through your browser settings.</p>
      
      <h2>4. Third-Party Cookies</h2>
      <p>We may use third-party analytics cookies to improve services.</p>
    `,
    accessibility: `
      <h2>1. Our Commitment</h2>
      <p>HOTMESS Enterprise is committed to ensuring digital accessibility for all users.</p>
      
      <h2>2. Standards</h2>
      <p>We strive to meet WCAG 2.1 Level AA standards for web accessibility.</p>
      
      <h2>3. Features</h2>
      <ul>
        <li>Keyboard navigation support</li>
        <li>Screen reader compatibility</li>
        <li>High contrast color schemes</li>
        <li>Scalable text and layouts</li>
      </ul>
      
      <h2>4. Feedback</h2>
      <p>If you encounter accessibility barriers, please contact us for assistance.</p>
    `
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
          <h1 className="text-2xl font-bold tracking-wider">{titles[type]}</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">{titles[type]}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: January 2024
          </p>
          <div
            className="space-y-6 text-foreground"
            dangerouslySetInnerHTML={{ __html: content[type] }}
          />
        </div>
        
        <div className="mt-12 p-6 bg-card border-2 border-border">
          <h3 className="text-xl font-bold mb-4">Questions or Concerns?</h3>
          <p className="text-muted-foreground">
            If you have questions about this {titles[type].toLowerCase()},
            please contact us at{' '}
            <a href="mailto:legal@hotmess.live" className="text-accent hover:underline">
              legal@hotmess.live
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
