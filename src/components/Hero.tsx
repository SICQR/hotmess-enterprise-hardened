import { motion } from 'framer-motion';
import { usePrefersReduced } from '@/hooks/usePrefersReduced';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Button } from '@/components/ui/button';
import { Radio, ShoppingBag } from '@phosphor-icons/react';

interface HeroProps {
  onNavigate: (route: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const reduced = usePrefersReduced();
  const progress = useScrollProgress('hero-anchor');

  // Inverse progress: 1 at top (fully visible), 0 when scrolled past (hidden)
  const opacity = reduced ? 1 : 1 - progress;
  const scale = reduced ? 1 : 1 - progress * 0.1;

  return (
    <div 
      id="hero-anchor" 
      className="relative min-h-screen flex items-center justify-center border-b-2 border-border"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
      }}
    >
      <motion.div
        className="text-center px-4 py-24"
        style={{
          opacity: reduced ? 1 : opacity,
          transform: reduced ? 'none' : `scale(${scale})`,
          pointerEvents: progress > 0.8 ? 'none' : 'auto',
        }}
      >
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          BRUTALIST<br />LUXURY<br />EDITORIAL
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Live radio. Culture. Commerce. Community.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => onNavigate('radio')}
            size="lg"
            className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground text-lg"
            aria-label="Go to radio page"
          >
            <Radio size={24} className="mr-2" aria-hidden="true" />
            LISTEN LIVE
          </Button>
          <Button
            onClick={() => onNavigate('shop')}
            size="lg"
            variant="outline"
            className="h-14 px-8 border-2 text-lg"
            aria-label="Go to shop page"
          >
            <ShoppingBag size={24} className="mr-2" aria-hidden="true" />
            BROWSE SHOP
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
