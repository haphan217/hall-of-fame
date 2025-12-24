import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _cloudinary from "cloudinary-video-player";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
