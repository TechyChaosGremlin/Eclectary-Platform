import React from "react";
import ReactDOM from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./styles/global.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <App />
        <SpeedInsights />
        <Analytics />
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);