'use client';
import { useEffect, useState } from 'react';

export function useScrollProgress(targetId = 'hero-anchor') {
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight || 1;
      const raw = 1 - Math.min(Math.max((rect.bottom - h) / Math.max(rect.height, 1), 0), 1);
      setT(raw);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetId]);
  return t; // 0..1
}
