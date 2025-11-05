import { useEffect } from "react";

/**
 * Injects a third‑party analytics script (e.g. Umami or Plausible) if
 * an analytics ID is provided via VITE_ANALYTICS_ID. The script is
 * appended to the document head when the component mounts. Place this
 * component near the root of your application.
 */
export default function Analytics() {
  useEffect(() => {
    const id = import.meta.env.VITE_ANALYTICS_ID;
    if (!id) return;
    const script = document.createElement("script");
    // Example uses Umami; replace with your own analytics provider
    script.src = `https://umami.example.com/script.js`;
    script.async = true;
    script.setAttribute("data-website-id", id);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return null;
}
