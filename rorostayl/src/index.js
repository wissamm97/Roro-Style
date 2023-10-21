import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import reportWebVitals from "./reportWebVitals";
import "@stripe/stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
