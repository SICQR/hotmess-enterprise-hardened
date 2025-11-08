import React, { useEffect, useState } from 'react';
import { radioSchedule } from '../data/radioSchedule';
import { radioDailySchedule } from '../data/radioDailySchedule';
import { getNowPlaying } from '../lib/radio';

interface CurrentTrack {
  title: string
  artist: string
  cover?: string | null
}

/**
 * Radio page outlines the HOTMESS Radio schedule and gives users an
 * understanding of what to expect from our three flagship shows. The
 * streaming capability is mocked; clicking the button displays an alert
 * instead of starting a real stream. Copy draws on the planned rundowns
 * including stingers, sponsor reads, consent cues, Wetter Watch and
 * closing affirmations.
 */
export default function Radio() {
  const [track, setTrack] = useState<CurrentTrack | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const now = await getNowPlaying()
      setTrack({ title: now.title, artist: now.artist, cover: now.artwork })
      setLoading(false)
    })()
  }, [])

  return (
    <div className="px-4 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">HOTMESS Radio</h1>
      <p className="mb-8 opacity-80">
        24/7 men’s only vibes. Tune in for bold beats, call‑ins and aftercare: Wake the Mess in the morning,
        Dial‑A‑Daddy three times a week, and Hand N Hand every Sunday.
      </p>
      {/* Current track display */}
      <div className="mb-8 bg-[#1a1a1a] p-4 rounded flex items-center space-x-4">
        {loading ? (
          <span className="opacity-60">Loading now playing…</span>
        ) : track ? (
          <>
            {track.cover && (
              <img src={track.cover} alt={`${track.title} cover`} className="w-16 h-16 object-cover rounded" />
            )}
            <div>
              <p className="font-bold">Now Playing</p>
              <p>{track.title} – {track.artist}</p>
            </div>
          </>
        ) : (
          <span className="opacity-60">Unable to fetch current track</span>
        )}
      </div>
      {/* Weekly schedule table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Weekly Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="px-2 py-1 border border-[#2c0000]">Day</th>
                <th className="px-2 py-1 border border-[#2c0000]">Time</th>
                <th className="px-2 py-1 border border-[#2c0000]">Show</th>
              </tr>
            </thead>
            <tbody>
              {radioDailySchedule.map(day => (
                day.lineup.map((slot, idx) => (
                  <tr key={day.day + idx} className={idx % 2 === 0 ? '' : 'bg-[#1a1a1a]'}>
                    {idx === 0 && (
                      <td rowSpan={day.lineup.length} className="px-2 py-1 border border-[#2c0000] font-bold">
                        {day.day}
                      </td>
                    )}
                    <td className="px-2 py-1 border border-[#2c0000]">{slot.time}</td>
                    <td className="px-2 py-1 border border-[#2c0000]">{slot.show}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Iterate over the radio schedule to display each show and its segments */}
      <div className="space-y-8">
        {radioSchedule.map(show => (
          <div key={show.name} className="bg-[#1a1a1a] p-6 rounded">
            <h2 className="text-2xl font-bold mb-2">{show.name}</h2>
            <p className="opacity-80 mb-4">{show.overview}</p>
            <ul className="list-disc ml-6 space-y-1">
              {show.segments.map((seg, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{seg.label}:</span> {seg.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Live listening action; still mocked in this client‑side build */}
      <div className="mt-8 space-x-4">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            alert('Streaming not available in this mock build.');
          }}
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded text-white font-bold"
        >
          Listen Live
        </a>
        {/* Cross‑sell CTA to shop and affiliate */}
        <button
          onClick={() => alert('Check out the Shop page for the looks featured on our shows!')}
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded text-white font-bold"
        >
          Shop the Looks
        </button>
        <button
          onClick={() => alert('Join our Affiliate Gang and earn commissions!')}
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded text-white font-bold"
        >
          Join Affiliate
        </button>
        {/* New hydration hint and care link */}
        <button
          onClick={() => alert('Stay hydrated – visit Care for aftercare tips and grounding practices.')}
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded text-white font-bold"
        >
          Hydration Hint
        </button>
      </div>
    </div>
  );
}