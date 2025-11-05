import React, { useState, useEffect } from 'react';
import { getCurrentWeather, Weather } from '../lib/weather';

interface HomeProps {
  onNavigate: (route: any) => void;
}

/**
 * Home page for HOTMESS. Combines a bold hero section with a series of
 * call-to-action cards that link into the rest of the ecosystem: Shop,
 * Radio, Care and Earn. Each card uses descriptive copy and clear
 * navigation to provide a seamless path forward. The hero replicates
 * the original landing page styling.
 */
export default function Home({ onNavigate }: HomeProps) {
  const [weather, setWeather] = useState<Weather | null>(null)

  // Fetch weather on mount. If geolocation fails, default to London (51.5072, -0.1276)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async pos => {
          const data = await getCurrentWeather(pos.coords.latitude, pos.coords.longitude)
          setWeather(data)
        },
        async () => {
          const data = await getCurrentWeather(51.5072, -0.1276)
          setWeather(data)
        },
      )
    } else {
      ;(async () => {
        const data = await getCurrentWeather(51.5072, -0.1276)
        setWeather(data)
      })()
    }
  }, [])

  return (
    <div>
      <header className="text-center py-24 relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#2c0000] via-[#9b111e] to-[#2c0000]" />
        <h1
          className="font-black text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(#f4f4f4,#bdbdbd)',
            fontSize: 'clamp(48px,10vw,112px)',
            filter: 'drop-shadow(0 1px 0 rgba(0,0,0,.25))',
          }}
        >
          HOTMESS
        </h1>
        <p className="text-[#f2c122] font-bold mt-2 text-2xl">
          Live Loud. Land Soft.
        </p>
        <p className="mt-2 max-w-3xl mx-auto px-4 opacity-80 text-sm md:text-base">
          24/7 underground radio. Trophy fashion. Heat‑map connection. Men‑only, 18+. Brutalist luxury with sweat, steel, and soft landings tucked under the noise.
        </p>
        {/* Display current weather if available */}
        {weather && (
          <p className="text-sm text-[#f2c122] mt-2 opacity-80">
            {weather.description}, {weather.temperature.toFixed(1)}°C
          </p>
        )}
      </header>
      <section className="px-4 py-12 max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-4">Enter the Mess</h2>
          <p className="max-w-2xl mx-auto opacity-80">
            Men-only, 18+. A bold queer ecosystem built on consent, care, and creative chaos.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Listen Live */}
          <button
            className="bg-red-700 hover:bg-red-800 p-6 rounded-lg text-left"
            onClick={() => onNavigate('radio')}
          >
            <h3 className="text-xl font-bold">Listen Live →</h3>
            <p className="text-sm opacity-80 mt-2">
              Tune into Wake the Mess, Dial‑A‑Daddy and Hand N Hand.
            </p>
          </button>
          {/* Shop RAW / HUNG / HIGH */}
          <button
            className="bg-red-700 hover:bg-red-800 p-6 rounded-lg text-left"
            onClick={() => onNavigate('shop')}
          >
            <h3 className="text-xl font-bold">Shop RAW / HUNG / HIGH →</h3>
            <p className="text-sm opacity-80 mt-2">
              Gear for every mood across RAW, HUNG and HIGH.
            </p>
          </button>
          {/* SUPER Limited Drops */}
          <button
            className="bg-red-700 hover:bg-red-800 p-6 rounded-lg text-left"
            onClick={() => onNavigate('shop')}
          >
            <h3 className="text-xl font-bold">SUPER Limited Drops →</h3>
            <p className="text-sm opacity-80 mt-2">
              Trophy-status pieces numbered and immortalised.
            </p>
          </button>
          {/* Scan + Earn */}
          <button
            className="bg-red-700 hover:bg-red-800 p-6 rounded-lg text-left"
            onClick={() => onNavigate('scan')}
          >
            <h3 className="text-xl font-bold">Scan + Earn →</h3>
            <p className="text-sm opacity-80 mt-2">
              Earn points with every beacon — status meets curiosity.
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}