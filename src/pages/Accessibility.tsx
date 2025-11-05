import React from "react";

/**
 * Accessibility page communicates HOTMESS’ commitment to inclusive
 * design. It outlines the measures taken to ensure the site is
 * navigable and readable by all users and invites feedback on
 * accessibility.
 */
export default function Accessibility() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Accessibility</h1>
      <p className="mb-6 opacity-80">
        HOTMESS is committed to being inclusive and accessible to all users.
      </p>
      <ul className="list-disc ml-8 space-y-2 mb-4">
        <li>We use high-contrast colors and readable font sizes.</li>
        <li>All images include descriptive alt text.</li>
        <li>The interface is fully navigable with keyboard controls.</li>
        <li>If you encounter any accessibility issues, please contact us.</li>
      </ul>
    </div>
  );
}
