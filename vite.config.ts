import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: ["https://mysubdomain.domain.io", "http://localhost:5173"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
    allowedHosts: ["5eb3-82-11-245-76.ngrok-free.app"], //added this
  },
});
