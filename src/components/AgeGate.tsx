import React, { useState } from 'react';

/**
 * AgeGate prompts the user to confirm they are 18+ and consenting before
 * accessing any part of the HOTMESS application. On confirmation it
 * persists a flag in sessionStorage and invokes the provided callback to
 * signal the parent component to hide the gate. Rejecting simply shows a
 * message; users cannot proceed without consenting.
 */
interface AgeGateProps {
  onConfirm: () => void;
}

export default function AgeGate({ onConfirm }: AgeGateProps) {
  const [showWarning, setShowWarning] = useState(false);

  const handleYes = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('age-verified', 'true');
    }
    onConfirm();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Are you 18+ and consenting to continue?
      </h1>
      <div className="flex space-x-4">
        <button
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          onClick={handleYes}
        >
          Yes, Enter
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded font-bold"
          onClick={() => setShowWarning(true)}
        >
          No
        </button>
      </div>
      {showWarning && (
        <p className="mt-6 text-sm text-center opacity-70">
          Sorry, you must be 18+ and consenting to use HOTMESS.
        </p>
      )}
    </div>
  );
}
