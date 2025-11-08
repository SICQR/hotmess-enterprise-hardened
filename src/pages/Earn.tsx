import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { sendTelegramMessage } from '../lib/telegram';

export default function Earn() {
  const [handle, setHandle] = useState('');
  const [community, setCommunity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function submitApplication() {
    try {
      await supabase.from('affiliates').insert({ handle, community, created_at: new Date().toISOString() });
      const modChat = import.meta.env.VITE_TELEGRAM_MOD_CHAT_ID;
      if (modChat) {
        await sendTelegramMessage(modChat, `New affiliate application from ${handle}: ${community}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit affiliate application', err);
      alert('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Join the Affiliate Gang</h1>
      <p className="mb-6 opacity-80">
        Earn while keeping it messy. Our men‑only affiliate program pays you to spread the HOTMESS message.
      </p>
      <h2 className="text-2xl font-bold mb-2">How It Works</h2>
      <ul className="list-disc ml-8 space-y-2 mb-4">
        <li>Apply using your chosen handle and share a bit about your community.</li>
        <li>Receive your unique affiliate link powered by the HMAC-secure browser crypto API.</li>
        <li>Earn a commission on every sale that comes through your link.</li>
        <li>Access exclusive drops and early previews as part of the gang.</li>
      </ul>
      {!submitted ? (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Your handle"
            className="w-full p-3 rounded bg-[#1a1a1a] text-white"
            value={handle}
            onChange={e => setHandle(e.target.value)}
          />
          <textarea
            placeholder="Tell us about your community"
            className="w-full p-3 rounded bg-[#1a1a1a] text-white"
            value={community}
            onChange={e => setCommunity(e.target.value)}
          />
          <button
            className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded text-white font-bold w-full"
            onClick={submitApplication}
          >
            Apply Now
          </button>
        </div>
      ) : (
        <p className="text-green-500">Thank you for applying! We’ll review your application and get back to you soon.</p>
      )}
      {/* Cross‑sell prompts for affiliates to engage with other features */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">Maximise Your Earnings</h2>
        <p className="opacity-80">
          As an affiliate you can drive sales by promoting exclusive drops, events and aftercare. Listen to our shows for promo codes and shop the latest to stay ahead.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => alert('Tune into HOTMESS Radio for codes you can share with your followers!')}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Listen to Radio
          </button>
          <button
            onClick={() => alert('Browse the shop and familiarise yourself with our products before promoting them!')}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Shop Now
          </button>
          <button
            onClick={() => alert('Need aftercare insights? Visit the Care page for resources you can share.')}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Visit Care
          </button>
        </div>
      </div>
    </div>
  );
}