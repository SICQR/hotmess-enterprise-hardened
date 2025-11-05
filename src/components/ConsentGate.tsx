import { useState } from "react";
export default function ConsentGate({ children }: { children: any }) {
  const [ok, setOk] = useState(false);
  if (ok) return children;
  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h2 className="text-xl font-bold mb-3">Consent Required</h2>
      <p className="mb-4 text-sm opacity-80">
        Adult content. Confirm to continue.
      </p>
      <button
        onClick={() => setOk(true)}
        className="px-4 py-2 bg-white text-black font-bold rounded"
      >
        I consent and am 18+
      </button>
    </div>
  );
}
