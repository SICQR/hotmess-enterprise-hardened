import React, { useState } from 'react'

/**
 * Rooms page delivers a Telegram‑feel chat interface within HOTMESS. While
 * not connected to a backend in this mock build, it demonstrates how
 * conversations might appear and encourages users to explore other
 * features via embedded calls to action. Messages are stored in local
 * component state for demonstration purposes only.
 */
export default function Rooms() {
  // Prepopulate with a few sample messages to convey tone. Each message
  // includes a sender and content. In production messages would be
  // fetched via Supabase or a websocket feed.
  const [messages, setMessages] = useState([
    { sender: 'HNH Bot', text: '👋 Welcome to the Mess Room. Stay hydrated.' },
    { sender: 'User123', text: 'Anyone grabbing the SUPER drop tonight?' },
    { sender: 'DJ_Nic', text: 'Don’t miss my set at midnight. Drops inbound.' },
  ])
  const [input, setInput] = useState('')

  function handleSend() {
    if (!input.trim()) return
    setMessages(prev => [...prev, { sender: 'You', text: input.trim() }])
    setInput('')
  }
  return (
    <div className="px-4 py-12 max-w-5xl mx-auto flex flex-col h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-extrabold mb-4">Mess Rooms</h1>
      <p className="mb-4 opacity-80">
        Feels like Telegram, governed by Telegram rules. Live chat sits inside
        HOTMESS with bot‑dropped QR codes, late‑night drops and product
        shoutouts. Hydration reminders slip into the margins. Not therapy –
        just brotherhood and presence.
      </p>
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto bg-[#1a1a1a] rounded p-4 space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs opacity-60 mb-1 font-semibold">{msg.sender}</span>
            <p className="bg-[#2c0000] inline-block max-w-xs px-3 py-2 rounded-lg text-sm">
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded bg-[#1a1a1a] text-white"
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend()
          }}
        />
        <button
          className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded text-white font-bold"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      {/* CTAs to encourage cross‑navigation */}
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-bold">Explore More</h2>
        <p className="opacity-80 max-w-xl">
          Scan a QR code to earn rewards and unlock hidden rooms, browse the
          latest drops or take a break with some aftercare. The Mess doesn’t
          stop here.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => alert('Scan page will parse your QR and award points!')} 
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Scan + Earn
          </button>
          <button
            onClick={() => alert('Head to the Shop and flex your status!')} 
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Shop Now
          </button>
          <button
            onClick={() => alert('Need to decompress? Visit Care for hydration and grounding tips.')} 
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Care & Aftercare
          </button>
        </div>
      </div>
    </div>
  )
}