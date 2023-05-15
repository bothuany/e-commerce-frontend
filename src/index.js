import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { ClassifierProvider } from "./contexts/ClassifierContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <UserProvider>
        <ClassifierProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ClassifierProvider>
      </UserProvider>
    </BrowserRouter>
  </React.Fragment>
);

reportWebVitals();
