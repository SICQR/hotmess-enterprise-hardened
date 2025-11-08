import React, { useState, useEffect } from 'react';
import AgeGate from './components/AgeGate';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Radio from './pages/Radio';
import Shop from './pages/Shop';
import Care from './pages/Care';
import Earn from './pages/Earn';
import Blueprints from './pages/Blueprints';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Accessibility from './pages/Accessibility';
import Beacon from './pages/Beacon';
import AIConcierge from './components/AIConcierge';
import Analytics from './components/Analytics';
import Leaderboard from './pages/Leaderboard';
import HeatGlobe from './pages/HeatGlobe';
import Rooms from './pages/Rooms';
import { useLocalState } from './hooks/useLocalState';

// Define the set of valid routes for the application. Keeping routes as
// literal strings makes it easy to navigate via the Nav component while
// ensuring type safety when switching pages.
type Route =
  | 'home'
  | 'about'
  | 'radio'
  | 'shop'
  | 'care'
  | 'earn'
  | 'blueprints'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'accessibility'
  | 'scan'
  /**
   * Leaderboard page shows the first‑ten trophy drops and the hall of fame. It
   * allows collectors to see who owns the earliest numbered pieces and
   * encourages others to secure their spot. The route string must match
   * the key defined in the Nav items.
   */
  | 'leaderboard'
  /**
   * Heat Globe page displays the interactive beacon map. It invites users
   * to spin the globe, explore drop locations and hop into nearby rooms.
   */
  | 'heatglobe'
  /**
   * Rooms page contains the Telegram‑feel chat interface. Here users can
   * congregate in discussion channels, with bots dropping codes and care
   * reminders in the margins. This route surfaces the page.
   */
  | 'rooms';

export default function App() {
  // Track the current route; default to the home page on load.
  const [route, setRoute] = useState<Route>('home');
  // Points are stored in localStorage so they persist across sessions. We manage
  // them here and pass them down to components that need to display or mutate
  // the value (e.g. the Nav and Beacon pages).
  const [points, setPoints] = useLocalState<number>('userPoints', 0);
  // Determine whether the user has verified they are 18+ and consenting. If
  // running in the browser, read from sessionStorage; otherwise default to
  // false. This value persists for the current session only.
  const [ageVerified, setAgeVerified] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem('age-verified') === 'true',
  );

  // On initial mount, check if a beacon code exists in the URL. If so,
  // automatically navigate to the scan route so the Beacon page can handle it.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('code') || params.get('c')) {
        setRoute('scan');
      }
    }
  }, []);

  // Called when the user confirms they are 18+ and consenting. This sets
  // local state to hide the age gate overlay.
  const handleAgeConfirm = () => {
    setAgeVerified(true);
  };

  // Show the age gate if the user has not yet confirmed their age. This
  // ensures compliance with the men-only, 18+ requirement across all pages.
  if (!ageVerified) {
    return <AgeGate onConfirm={handleAgeConfirm} />;
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white font-[Inter] flex flex-col">
      {/* Primary navigation bar. Highlights the current route, displays points and provides
          links to every page in the ecosystem. */}
      <Nav current={route} onNavigate={setRoute} points={points} />
      {/* Render the selected page. Each page component receives navigation
          callbacks as needed to allow cross-linking. */}
      <div className="flex-1">
        {route === 'home' && <Home onNavigate={setRoute} />}
        {route === 'about' && <About />}
        {route === 'radio' && <Radio />}
        {route === 'shop' && <Shop />}
        {route === 'care' && <Care />}
        {route === 'earn' && <Earn />}
        {route === 'blueprints' && <Blueprints />}
        {route === 'privacy' && <Privacy />}
        {route === 'terms' && <Terms />}
        {route === 'cookies' && <Cookies />}
        {route === 'accessibility' && <Accessibility />}
        {route === 'scan' && <Beacon />}
        {/* Newly added pages for leaderboard, heat globe and chat rooms */}
        {route === 'leaderboard' && <Leaderboard />}
        {route === 'heatglobe' && <HeatGlobe />}
        {route === 'rooms' && <Rooms />}
      </div>
      {/* Render the AI concierge floating chat across all pages */}
      <AIConcierge />
      {/* Footer containing evergreen safety reminders and copyright. */}
      <Footer />
      {/* Inject analytics script if configured */}
      <Analytics />
    </main>
  );
}
