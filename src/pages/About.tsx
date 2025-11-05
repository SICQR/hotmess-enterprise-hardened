import React from 'react'

/**
 * About page outlines the manifesto of HOTMESS – what we do, our core
 * offerings and the underlying philosophy. This page fuses the
 * disparate sections of the manifesto into a cohesive narrative,
 * organised by topic with calls‑to‑action where appropriate.
 */
export default function About() {
  return (
    <div className="px-4 py-12 max-w-5xl mx-auto space-y-10">
      <section>
        <h1 className="text-4xl font-extrabold mb-4">What We Do</h1>
        <p className="opacity-80 mb-4">
          HOTMESS builds a provocative world for men who move – clubs, gyms, studios, rooftops, afters, recovery mornings. We blend culture, commerce and care into a brutalist‑luxury platform.
        </p>
        <ul className="list-disc ml-6 space-y-2 opacity-90">
          <li>
            <strong>Radio:</strong> industrial dawn, dirty midnight and Sunday landing shows across Wake the Mess, Dial‑A‑Daddy and Hand N Hand.
          </li>
          <li>
            <strong>Fashion:</strong> RAW, HUNG, HIGH and once‑gone‑forever SUPER runs – gear and apparel that flexes without apology.
          </li>
          <li>
            <strong>Marketplace:</strong> curated third‑party gear and creator economy collabs.
          </li>
          <li>
            <strong>Heat Globe:</strong> spin the world like Google Earth; beacons pulse; drop your signal.
          </li>
          <li>
            <strong>QR Culture:</strong> scan to enter, scan to flex, scan to earn – status mechanics without calling it a game.
          </li>
          <li>
            <strong>Quiet Support:</strong> hydration hints, soft landings and crisis links tucked deep – care dressed as kink.
          </li>
        </ul>
        <p className="mt-4 opacity-80">We don’t moralise. We stand shoulder to shoulder in steel, sweat and real life.</p>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">SUPERHUNG / SUPERRAW – Trophy Drops</h2>
        <p className="opacity-80 mb-2">
          When they’re gone, they’re mythology. Limited runs where the first 10 pieces are hand‑numbered and immortalised. Buyers join the SUPER Leaderboard – a carved‑in‑stone flex with profiles for collectors.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Leaderboard coming soon')}>View Leaderboard</button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Secure your drop via the Shop page')}>Secure My Drop</button>
        </div>
        <p className="mt-2 text-sm opacity-70">Status lives in scarcity. Flex belongs to the first ten.</p>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">HNH MESS – Care Under Kink</h2>
        <p className="opacity-80 mb-2">
          Not a lecture – a hand on your back at sunrise. The only lube on earth that arrives with real aftercare info – hydration, grounding, crisis pathways. Not medical advice, not guilt. Think a friend handing you water, not a pamphlet.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Shop HNH MESS via the Shop page')}>Shop HNH MESS</button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Tune into Hand N Hand Sundays via Radio')}>Listen: Hand N Hand Sundays</button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Access our Quiet Landing page soon')}>Quiet Landing Page</button>
        </div>
        <p className="mt-2 text-sm opacity-70">Aftercare = information + services, never judgement.</p>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">Radio – RAW CONVICT</h2>
        <p className="opacity-80 mb-2">
          Built from sweat, loss, joy, memory and movement. Our debut track <em>HOTMESS</em> by Paul King & Stewart Who carries the truth queer men know: we dance, we lose, we rise, we don’t abandon each other. Legendary remixes and provocative truth – no glamorising, just not looking away.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Listen live via the Radio page')}>Listen Live</button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Explore all shows via Radio')}>Shows</button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Hear our debut track soon')}>Hear HOTMESS</button>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">Heat Globe & Beacons</h2>
        <p className="opacity-80 mb-2">
          Spin the world like Google Earth Pro. Beacons glow. Stories flicker. Energy visible. Host if your tier unlocks it: at‑home curious, warehouse meet‑point, private buyer room, drop alert heat‑spot, pre‑set DJ beacon. Scan to enter. Scan to check in. Curiosity is cultural currency here.
        </p>
        <button
          className="mt-2 bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          onClick={() => alert('Explore the interactive Heat Globe soon!')}
        >
          Explore Heat Globe
        </button>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">Telegram‑Feel Rooms</h2>
        <p className="opacity-80 mb-2">
          Feels like Telegram. Governed by Telegram rules. Lives seamlessly inside HOTMESS. Bot‑dropped QR codes, late‑night drops and product shoutouts without spam. Subtle hydration reminders in the margins. Not therapy – just brotherhood and presence.
        </p>
        <button
          className="mt-2 bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          onClick={() => alert('Enter Mess Rooms soon!')}
        >
          Enter Rooms
        </button>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">QR & Affiliate Society</h2>
        <p className="opacity-80 mb-2">
          Don’t call it a game. It’s a status mechanic with rewards. Scan to unlock. Build trust tiers. Bots can drop your codes if you earn it. Earn without begging for engagement. Real‑world clout meets digital receipts.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('Get your QR code via Scan + Earn')}>Get My QR</button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold" onClick={() => alert('View your dashboard soon')}>Dashboard</button>
        </div>
        <p className="mt-2 text-sm opacity-70">Scan because curiosity always wins.</p>
      </section>
      <section>
        <h2 className="text-3xl font-extrabold mb-2">Brand Truth</h2>
        <p className="opacity-80">
          We’re not here to rescue. We’re here to stand beside, not above. Steel, sweat, music, choice. No shame. No judgment. Strong, safe, together.
        </p>
      </section>
    </div>
  )
}