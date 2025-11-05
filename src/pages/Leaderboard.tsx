import React from "react";

/**
 * Leaderboard page celebrates the collectors who secure the first ten
 * pieces of every SUPER drop. To reflect the brutalist‑luxury ethos
 * we combine stark typography with nightclub‑inspired lighting. All
 * data is static in this demo; in production it would be fetched
 * from Supabase or Shopify. Users can also navigate to secure their
 * own drop or earn additional status via QR scans.
 */
export default function Leaderboard() {
  // Placeholder data for the first ten numbered pieces. The names are
  // anonymised to respect privacy; in a real app users could opt in to
  // display their handle or remain incognito.
  const entries = [
    { number: 1, holder: "Collector 01" },
    { number: 2, holder: "Collector 02" },
    { number: 3, holder: "Collector 03" },
    { number: 4, holder: "Collector 04" },
    { number: 5, holder: "Collector 05" },
    { number: 6, holder: "Collector 06" },
    { number: 7, holder: "Collector 07" },
    { number: 8, holder: "Collector 08" },
    { number: 9, holder: "Collector 09" },
    { number: 10, holder: "Collector 10" },
  ];
  return (
    <div className="px-4 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">SUPER Leaderboard</h1>
      <p className="mb-6 opacity-80">
        When they’re gone, they’re mythology. The first ten owners of every
        SUPER drop live here forever. Opt in to display your handle or stay
        incognito. Flex belongs to the first ten.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {entries.map((entry) => (
          <div
            key={entry.number}
            className="bg-[#1a1a1a] p-6 rounded shadow flex flex-col items-start"
          >
            <div className="text-6xl font-black mb-2 text-red-700">
              {String(entry.number).padStart(2, "0")}
            </div>
            <p className="text-lg font-bold">{entry.holder}</p>
            <p className="text-sm opacity-60">Trophy secured</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Want your name here?</h2>
        <p className="opacity-80 max-w-xl">
          Secure your own numbered drop before it sells out. Each SUPER drop
          releases only ten hand‑numbered pieces. Once gone, they’re carved into
          our hall of fame. You can also earn status by scanning beacons and
          participating in the heat‑globe events.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() =>
              alert("Head to the Shop page and grab your limited piece!")
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Secure My Drop
          </button>
          <button
            onClick={() => alert("Scan a QR beacon and start earning points!")}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Scan + Earn
          </button>
        </div>
        <p className="mt-2 text-xs opacity-60">
          Note: Names displayed above are anonymised. In production this page
          would respect user privacy and GDPR requests.
        </p>
      </div>
    </div>
  );
}
