import React from "react";

/**
 * HeatGlobe page offers a conceptual preview of the HOTMESS beacon map. It
 * invites users to spin an abstract globe, discover pulsing beacons and
 * jump into nearby rooms or drops. While the globe is not truly
 * interactive in this mock build, the layout suggests how the final
 * experience will feel. Calls to action encourage exploration of the
 * scan page, rooms and shop.
 */
export default function HeatGlobe() {
  return (
    <div className="px-4 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Heat Globe</h1>
      <p className="mb-6 opacity-80">
        Spin the world like Google Earth Pro. Beacons glow, stories flicker and
        energy becomes visible. Host a beacon if your tier unlocks it: from
        at‑home curiosity to warehouse meet‑points, private buyer rooms and DJ
        pulses. Every scan earns status and opens new corners of our world.
      </p>
      {/* Abstract globe using CSS animation. On real implementation this
          would be replaced with a WebGL or canvas map. */}
      <div className="relative mx-auto w-64 h-64 mb-8">
        {/* The inner sphere uses inline animation to rotate slowly. Tailwind
            includes an animate-spin utility but it defaults to one
            rotation per second; here we slow it down with a longer
            duration. */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-700 via-red-900 to-black"
          style={{ animation: "spin 20s linear infinite" }}
        />
        <div className="absolute inset-6 rounded-full border-2 border-red-900 opacity-50"></div>
        <div className="absolute inset-12 rounded-full border-2 border-red-900 opacity-30"></div>
        <p className="absolute bottom-0 left-0 right-0 text-center text-xs mt-2 opacity-50">
          Interactive globe coming soon
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Explore & Earn</h2>
        <p className="opacity-80 max-w-xl">
          Use your finger or mouse to spin the globe (in the future) and see
          which areas are pulsing. Scan the associated QR codes to join a room,
          claim a drop or simply check in. The more you explore, the more points
          you earn.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() =>
              alert("Scan page will open and parse your QR beacon.")
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Scan + Earn
          </button>
          <button
            onClick={() => alert("Chat rooms coming soon!")}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Join Rooms
          </button>
          <button
            onClick={() =>
              alert("Head to the Shop and find gear that matches your vibe")
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Shop Drops
          </button>
        </div>
      </div>
    </div>
  );
}

// Slow rotation animation using Tailwind plugin style. You can define
// `animate-spin-slow` in your tailwind config by extending the keyframes,
// or fallback to inline CSS when animation utilities are unavailable. For
// this demo we rely on the provided class from the base config.
