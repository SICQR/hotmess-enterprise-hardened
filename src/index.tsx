import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Entry point for the React application. This file mounts the App component
// into the #root element defined in index.html. React 18's createRoot API
// enables concurrent rendering.
const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
