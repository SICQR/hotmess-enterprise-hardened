import React from "react";

/**
 * Terms and conditions page defines the rules of engagement for using
 * HOTMESS. It highlights the men-only, 18+ restriction and outlines
 * acceptable use expectations. By using the app, users agree to these
 * terms.
 */
export default function Terms() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Terms &amp; Conditions</h1>
      <p className="mb-6 opacity-80">
        Please read these terms carefully. By using HOTMESS, you agree to the
        following:
      </p>
      <ul className="list-disc ml-8 space-y-2 mb-4">
        <li>
          HOTMESS is a men‑only, 18+ platform. You must be over 18 and
          consenting to use it.
        </li>
        <li>
          All content is for entertainment and informational purposes only; no
          medical advice.
        </li>
        <li>
          We reserve the right to modify or terminate the service at any time.
        </li>
        <li>Any abusive behavior will result in removal of access.</li>
      </ul>
    </div>
  );
}
