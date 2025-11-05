import React from "react";

/**
 * Cookie policy page clarifies how HOTMESS uses browser cookies to
 * remember age verification and to collect anonymous usage analytics.
 */
export default function Cookies() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Cookie Policy</h1>
      <p className="mb-6 opacity-80">
        This site uses cookies to enhance your experience.
      </p>
      <ul className="list-disc ml-8 space-y-2 mb-4">
        <li>
          Session cookies track whether you’ve verified your age and consent.
        </li>
        <li>
          Analytics cookies help us understand how the site is used in
          aggregate.
        </li>
        <li>You may clear cookies at any time via your browser settings.</li>
      </ul>
    </div>
  );
}
