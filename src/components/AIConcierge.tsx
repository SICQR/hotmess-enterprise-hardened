import React, { useState, useEffect, useRef } from "react";

/**
 * AIConcierge renders a persistent chat assistant that floats over the
 * application. When clicked it expands into a simple conversation
 * interface. It uses a small rule‑based system to provide responses
 * based on keywords. In a production system this could call an AI
 * service, but for this client‑side build we avoid external APIs.
 */
export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Basic rule‑based response generator. Pattern matching keywords
  // returns a canned reply. This can easily be extended with more
  // patterns or replaced with a call to an external API.
  function getResponse(text: string): string {
    const lower = text.toLowerCase();
    if (/(recommend|suggest).*product/.test(lower)) {
      return "Check out the HIGH Harness or RAW Hoodie – they’re popular right now!";
    }
    if (/(radio|show|schedule)/.test(lower)) {
      return "We broadcast Wake the Mess every morning, Dial‑A‑Daddy three times a week and Hand N Hand on Sundays.";
    }
    if (/(care|aftercare)/.test(lower)) {
      return "Aftercare is important. Hydrate, breathe and visit the Care section for resources.";
    }
    if (/(points|loyalty)/.test(lower)) {
      return "You earn points by scanning QR beacons and participating in drops. Your balance is shown in the nav bar.";
    }
    if (/(subscribe|membership|subscription)/.test(lower)) {
      return "Subscriptions are coming soon! For now, follow us on radio and shop our exclusive drops.";
    }
    if (/(hello|hi|hey)/.test(lower)) {
      return "Hey there! How can I help you explore HOTMESS?";
    }
    return "I’m not sure how to respond to that. Try asking about products, radio, care or points.";
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    // Add user message and bot response
    const userMsg = { sender: "user" as const, text: trimmed };
    const botMsg = { sender: "bot" as const, text: getResponse(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 text-sm">
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-full shadow-lg"
        >
          Chat with AI
        </button>
      )}
      {isOpen && (
        <div className="bg-[#1a1a1a] border border-[#2c0000] rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-[#2c0000]">
            <span className="font-bold text-[#f2c122]">AI Concierge</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#f2c122] hover:text-red-700"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "ml-auto bg-red-700 text-white" : "mr-auto bg-[#2c0000] text-[#f2c122]"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="p-2 border-t border-[#2c0000] flex"
          >
            <input
              type="text"
              className="flex-1 bg-transparent border border-[#2c0000] rounded-l px-2 py-1 text-white focus:outline-none"
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white px-3 rounded-r"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
