import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReduced } from "@/hooks/usePrefersReduced";
import { getNowPlaying } from "@/lib/radio";

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const reduced = usePrefersReduced();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let aborted = false;
    const minMs = Number(import.meta.env.VITE_SPLASH_MIN_MS ?? 950);

    // Check localStorage to skip splash on returning visits
    const skipSplash = localStorage.getItem("hotmess_skip_splash");
    if (skipSplash === "1") {
      setShow(false);
      onDone();
      return;
    }

    // Pre-fetch now-playing data
    const startTime = Date.now();

    Promise.all([
      getNowPlaying().catch(() => null),
      new Promise((resolve) => setTimeout(resolve, minMs)),
    ]).then(() => {
      if (aborted) return;

      // Set localStorage to skip on next visit (10 min TTL handled separately)
      localStorage.setItem("hotmess_skip_splash", "1");
      setTimeout(
        () => {
          localStorage.removeItem("hotmess_skip_splash");
        },
        10 * 60 * 1000,
      ); // 10 minutes

      setShow(false);
      setTimeout(onDone, reduced ? 0 : 400);
    });

    return () => {
      aborted = true;
    };
  }, [onDone, reduced]);

  if (!show) return null;

  const fadeVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  const duration = reduced ? 0.2 : 0.8;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeVariants}
          transition={{ duration }}
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl md:text-8xl font-black tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.2, duration }}
            >
              HOTMESS
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.4, duration }}
            >
              BRUTALIST LUXURY EDITORIAL
            </motion.p>
          </div>

          {/* Skip button for accessibility */}
          <button
            onClick={() => {
              setShow(false);
              onDone();
            }}
            className="absolute bottom-8 right-8 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
            aria-label="Skip splash screen"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
