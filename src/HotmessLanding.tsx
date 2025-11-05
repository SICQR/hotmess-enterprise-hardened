import React from "react";
import "./index.css";

export default function HotmessLanding() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white font-[Inter]">
      <header className="text-center py-24 relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#2c0000] via-[#9b111e] to-[#2c0000]" />
        <h1
          className="font-black text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(#f4f4f4,#bdbdbd)",
            fontSize: "clamp(48px,10vw,112px)",
            filter: "drop-shadow(0 1px 0 rgba(0,0,0,.25))",
          }}
        >
          HOTMESS
        </h1>
        <p className="text-[#f2c122] font-bold mt-2">
          ALWAYS TOO MUCH, YET NEVER ENOUGH
        </p>
      </header>
      <footer className="relative text-center bg-gradient-to-b from-transparent to-[#e11d2e]/40 py-12">
        <p className="opacity-60 text-xs mt-6">
          © {year} HOTMESS — 18+ only. Consent is the floor. Hydrate. Pace yourself. If it hurts, stop.
        </p>
      </footer>
    </main>
  );
}
