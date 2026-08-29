import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            padding: "14px 20px",
            fontSize: "14px",
            fontWeight: 500,
          },
        }}
      />
    </AuthProvider>
  </StrictMode>
);
