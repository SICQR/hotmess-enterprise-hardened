export function BrandShowcase() {
  return (
    <div className="bg-ink text-paper">
      <section className="relative gradient-hotmess h-screen flex flex-col justify-center items-center motion-tear overflow-hidden">
        <div className="pattern-brutalist-grid absolute inset-0 opacity-10" />
        
        <img 
          src="/icons/favicon.svg" 
          alt="HOTMESS Icon" 
          className="w-24 h-24 mb-8 motion-pulse relative z-10"
        />
        
        <h1 className="h1 text-center tracking-tight relative z-10 px-4">
          HOTMESS
        </h1>
        
        <div className="divider-gold w-64 my-6" />
        
        <p className="label text-gold mb-12">
          ALWAYS TOO MUCH, YET NEVER ENOUGH
        </p>
        
        <div className="flex gap-4 relative z-10">
          <button className="btn-brutalist">ENTER</button>
          <button className="btn-gold">EXPLORE</button>
        </div>
      </section>

      <section className="container mx-auto px-8 py-24">
        <h2 className="h2 text-center mb-4">Typography System</h2>
        <div className="divider-brutalist mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card-brutalist">
            <h3 className="h3 text-accent mb-4">Display Scale</h3>
            <div className="space-y-6">
              <div>
                <p className="label text-metal mb-2">H1 - HERO</p>
                <h1 className="h1">POWER</h1>
              </div>
              <div>
                <p className="label text-metal mb-2">H2 - SECTION</p>
                <h2 className="h2">CONVICTION</h2>
              </div>
              <div>
                <p className="label text-metal mb-2">H3 - SUBSECTION</p>
                <h3 className="h3">BRUTALISM</h3>
              </div>
              <div>
                <p className="label text-metal mb-2">H4 - CARD TITLE</p>
                <h4 className="h4">CHROME LUXURY</h4>
              </div>
            </div>
          </div>
          
          <div className="card-brutalist">
            <h3 className="h3 text-gold mb-4">Body Scale</h3>
            <div className="space-y-6">
              <div>
                <p className="label text-metal mb-2">BODY LARGE</p>
                <p className="body-large">
                  Brutalist luxury editorial platform combining live radio, commerce, and AI culture.
                </p>
              </div>
              <div>
                <p className="label text-metal mb-2">BODY</p>
                <p className="body">
                  Raw typographic scale with monochrome base and tactical texture. Strong kinetic motion.
                </p>
              </div>
              <div>
                <p className="label text-metal mb-2">BODY SMALL</p>
                <p className="body-small">
                  Editorial grid layout with tactile texture and audio-reactive visual cues.
                </p>
              </div>
              <div>
                <p className="label text-metal mb-2">LABEL</p>
                <p className="label">UPPERCASE LABEL TEXT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-8 py-24">
        <h2 className="h2 text-center mb-4">Color System</h2>
        <div className="divider-gold mb-16" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-full aspect-square bg-[hsl(0,0%,5%)] border-3 border-paper mb-4" />
            <p className="label">INK</p>
            <p className="caption text-metal">0 0% 5%</p>
          </div>
          
          <div className="text-center">
            <div className="w-full aspect-square bg-[hsl(0,0%,98%)] border-3 border-charcoal mb-4" />
            <p className="label">PAPER</p>
            <p className="caption text-metal">0 0% 98%</p>
          </div>
          
          <div className="text-center">
            <div className="w-full aspect-square bg-[hsl(0,85%,55%)] border-3 border-paper mb-4" />
            <p className="label">ACCENT</p>
            <p className="caption text-metal">0 85% 55%</p>
          </div>
          
          <div className="text-center">
            <div className="w-full aspect-square bg-[hsl(45,90%,55%)] border-3 border-paper mb-4" />
            <p className="label">GOLD</p>
            <p className="caption text-metal">45 90% 55%</p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-8">
          <h2 className="h2 text-center mb-4">Gradients</h2>
          <div className="divider-brutalist mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="gradient-hotmess w-full h-48 mb-4 flex items-center justify-center">
                <p className="label text-paper">HOTMESS</p>
              </div>
              <p className="label text-center">Chrome Red</p>
            </div>
            
            <div>
              <div className="gradient-gold w-full h-48 mb-4 flex items-center justify-center">
                <p className="label text-ink">GOLD</p>
              </div>
              <p className="label text-center">Gold Fade</p>
            </div>
            
            <div>
              <div className="gradient-radial w-full h-48 mb-4 flex items-center justify-center">
                <p className="label text-paper">RADIAL</p>
              </div>
              <p className="label text-center">Spotlight</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-8 py-24">
        <h2 className="h2 text-center mb-4">Buttons & Controls</h2>
        <div className="divider-gold mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-brutalist text-center">
            <h4 className="h4 text-accent mb-8">Primary</h4>
            <button className="btn-brutalist mb-4">ENTER</button>
            <p className="body-small text-metal">Brutalist outline, fills on hover</p>
          </div>
          
          <div className="card-brutalist text-center">
            <h4 className="h4 text-gold mb-8">Secondary</h4>
            <button className="btn-gold mb-4">SHOP NOW</button>
            <p className="body-small text-metal">Gold filled, outlines on hover</p>
          </div>
          
          <div className="card-brutalist text-center">
            <h4 className="h4 text-chrome mb-8">Tertiary</h4>
            <button className="btn-ghost mb-4">LEARN MORE</button>
            <p className="body-small text-metal">Ghost style, subtle hover</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-8">
          <h2 className="h2 text-center mb-4">Animations</h2>
          <div className="divider-brutalist mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-brutalist-hover motion-fade-in text-center">
              <div className="w-12 h-12 bg-accent rounded-full mx-auto mb-4 motion-pulse" />
              <h4 className="h4 mb-2">Pulse Glow</h4>
              <p className="body-small text-metal">Live indicators</p>
            </div>
            
            <div className="card-brutalist-hover motion-fade-in text-center" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-end justify-center gap-1 h-12 mb-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gold motion-audio-pulse"
                    style={{ 
                      height: '100%',
                      animationDelay: `${i * 0.05}s` 
                    }}
                  />
                ))}
              </div>
              <h4 className="h4 mb-2">Audio Pulse</h4>
              <p className="body-small text-metal">Waveform reactive</p>
            </div>
            
            <div className="card-brutalist-hover motion-fade-in text-center" style={{ animationDelay: '0.2s' }}>
              <div className="overflow-hidden h-12 mb-4">
                <div className="flex motion-marquee">
                  <span className="label text-accent mx-4">LIVE</span>
                  <span className="label mx-4">•</span>
                  <span className="label text-accent mx-4">HOTMESS</span>
                  <span className="label mx-4">•</span>
                  <span className="label text-accent mx-4">LIVE</span>
                  <span className="label mx-4">•</span>
                  <span className="label text-accent mx-4">HOTMESS</span>
                  <span className="label mx-4">•</span>
                </div>
              </div>
              <h4 className="h4 mb-2">Marquee</h4>
              <p className="body-small text-metal">Infinite scroll</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-8 py-24">
        <h2 className="h2 text-center mb-4">Patterns</h2>
        <div className="divider-gold mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="pattern-brutalist-grid w-full h-48 border-3 border-paper mb-4" />
            <p className="label text-center">Brutalist Grid</p>
          </div>
          
          <div>
            <div className="pattern-diagonal-lines w-full h-48 border-3 border-paper mb-4" />
            <p className="label text-center">Diagonal Lines</p>
          </div>
          
          <div>
            <div className="pattern-dots w-full h-48 border-3 border-paper mb-4" />
            <p className="label text-center">Dots</p>
          </div>
        </div>
      </section>

      <section className="gradient-hotmess py-32 motion-tear">
        <div className="container mx-auto px-8 text-center">
          <img 
            src="/icons/logo-wordmark.svg" 
            alt="HOTMESS Enterprise" 
            className="w-full max-w-2xl mx-auto mb-12"
          />
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="text-center">
              <p className="h3 text-gold mb-2">BRUTAL</p>
            </div>
            <div className="text-center">
              <p className="h3 text-chrome">•</p>
            </div>
            <div className="text-center">
              <p className="h3 text-gold mb-2">CHROME</p>
            </div>
            <div className="text-center">
              <p className="h3 text-chrome">•</p>
            </div>
            <div className="text-center">
              <p className="h3 text-gold mb-2">POWER</p>
            </div>
          </div>
          
          <p className="body-large text-paper max-w-2xl mx-auto mb-12">
            Complete brand system with logos, gradients, typography, animations, and accessibility-compliant design tokens. Ready for production.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-brutalist">VIEW DOCUMENTATION</button>
            <button className="btn-gold">EXPLORE ASSETS</button>
          </div>
        </div>
      </section>
    </div>
  )
}
