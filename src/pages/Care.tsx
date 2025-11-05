import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { sendTelegramMessage } from "../lib/telegram";

/**
 * Care page provides mental and physical aftercare advice and includes
 * a simple check-in form for users to reflect on their current
 * well-being. The submission does not persist data; in a future
 * integration it could be stored with Spark KV. Copy emphasizes that
 * the information is not medical advice.
 */
export default function Care() {
  const [feeling, setFeeling] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Persist the check-in to Supabase if configured
    (async () => {
      try {
        if (feeling.trim().length > 0) {
          await supabase
            .from("checkins")
            .insert({ message: feeling, created_at: new Date().toISOString() });
        }
        // Notify moderator via Telegram if chat ID and token are provided
        const modChat = import.meta.env.VITE_TELEGRAM_MOD_CHAT_ID;
        if (modChat) {
          await sendTelegramMessage(
            modChat,
            `New aftercare check-in: ${feeling}`,
          );
        }
      } catch (err) {
        console.error("Failed to submit check-in", err);
      }
    })();
  };

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">
        Hand N Hand: Care & Aftercare
      </h1>
      <p className="mb-8 opacity-80">
        Aftercare isn’t an afterthought. Here are some resources to decompress,
        hydrate, and reconnect. Not medical advice—just a friendly guide.
      </p>
      <ul className="list-disc ml-8 space-y-2 mb-8">
        <li>Drink a full glass of water and breathe deeply for two minutes.</li>
        <li>
          Check in with your partner(s): ask how they’re feeling and listen
          without judgment.
        </li>
        <li>Take a warm shower or bath to soothe your body.</li>
        <li>Journal or meditate to process your emotions.</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Check-in Form</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 bg-[#1a1a1a] rounded text-white"
            placeholder="How are you feeling right now?"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
          ></textarea>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold">
            Submit Check-in
          </button>
        </form>
      ) : (
        <p className="text-green-500">
          Thank you for checking in. We appreciate you taking care of yourself.
        </p>
      )}
      {/* Cross‑sell section linking to shop and radio */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">Next Steps</h2>
        <p className="opacity-80">
          Care doesn’t end here. Explore our HNH MESS line for products designed
          for aftercare, tune into Hand N Hand on Sundays for guided
          discussions, or join our affiliate programme to support others.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => alert("Shop HNH MESS products and treat yourself!")}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Shop HNH MESS
          </button>
          <button
            onClick={() =>
              alert(
                "Listen to Hand N Hand on HOTMESS Radio for more aftercare discussions!",
              )
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Listen to Radio
          </button>
          <button
            onClick={() => alert("Join our Affiliate Gang and share the care!")}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Join Affiliate
          </button>
        </div>
      </div>
    </div>
  );
}
