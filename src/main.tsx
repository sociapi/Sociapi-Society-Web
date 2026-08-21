import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { injectSpeedInsights } from "@vercel/speed-insights";
import App from "./App";
// @ts-ignore: CSS import declarations not available in this project setup
import "./index.css";

// Initialize Vercel Speed Insights
injectSpeedInsights();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);