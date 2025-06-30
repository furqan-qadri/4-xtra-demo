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
    allowedHosts: ["5047-81-79-170-186.ngrok-free.app"], //added this
  },
});
