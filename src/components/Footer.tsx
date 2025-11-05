import React from 'react';

/**
 * Footer displays a common bottom bar across all pages, including
 * copyright information and safety reminders. Using a separate component
 * ensures consistency and makes updates easy.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative text-center bg-gradient-to-b from-transparent to-[#e11d2e]/40 py-12 mt-12">
      <p className="opacity-60 text-xs mt-6">
        © {year} HOTMESS — 18+ only. Consent is the floor. Hydrate. Pace yourself. If it hurts, stop.
      </p>
    </footer>
  );
}