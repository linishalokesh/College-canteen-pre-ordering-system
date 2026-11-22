
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CanteenDataProvider } from "./context/CanteenDataContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CanteenDataProvider>
      <App />
    </CanteenDataProvider>
  </StrictMode>
);
