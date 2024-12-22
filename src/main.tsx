import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterApp } from "./router";

import "./index.css";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterApp />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
    </StrictMode>
  );
}
