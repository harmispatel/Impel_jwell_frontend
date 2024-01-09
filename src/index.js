import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import WishlistProvider from "./context/WishListContext";
import ImageProvider from "./context/ImageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ImageProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ImageProvider>
  </BrowserRouter>
);

reportWebVitals();
