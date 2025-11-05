import React from "react";

/**
 * Blueprints page documents the mock webhook events available in this
 * client-only application. While the events do not actually send
 * requests anywhere, describing them provides a blueprint for future
 * integrations. Copy emphasises the HMAC signature and logs to the
 * console used in the current implementation.
 */
export default function Blueprints() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Webhook Blueprints</h1>
      <p className="mb-6 opacity-80">
        HOTMESS uses mock webhooks to demonstrate how external services might
        integrate with our ecosystem. In this demo they log to the console only.
      </p>
      <h2 className="text-2xl font-bold mb-2">Events</h2>
      <ul className="list-disc ml-8 space-y-2 mb-4">
        <li>
          <span className="font-bold">checkin.submitted</span> – Fired when you
          complete a mental health check-in.
        </li>
        <li>
          <span className="font-bold">purchase.completed</span> – Fired after a
          successful mock checkout.
        </li>
        <li>
          <span className="font-bold">affiliate.joined</span> – Fired when an
          affiliate application is accepted.
        </li>
      </ul>
      <p className="opacity-80">
        Each event payload includes a signature header generated with HMAC using
        a secret key stored in the client. In a real implementation, these would
        be sent to a backend endpoint.
      </p>
    </div>
  );
}
