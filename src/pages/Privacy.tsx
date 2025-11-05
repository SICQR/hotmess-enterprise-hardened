import React from 'react';

/**
 * Privacy policy page outlines what minimal data the HOTMESS application
 * collects and how it is used. All storage is local to the browser and
 * subject to user consent. Users can delete their data at any time.
 */
export default function Privacy() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
      <p className="mb-6 opacity-80">
        We take your privacy seriously. This policy explains what data we collect and how we use it.
      </p>
      <ul className="list-disc ml-8 space-y-2 mb-4">
        <li>We collect minimal data to run this app, stored locally in Spark KV or sessionStorage.</li>
        <li>We use analytics to understand aggregated usage, but we never track individual identities.</li>
        <li>All data collection is purpose-limited and requires your consent.</li>
        <li>You can delete your local data at any time via your browser settings.</li>
      </ul>
    </div>
  );
}