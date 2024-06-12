import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@service": path.resolve(__dirname, "src/service/"),
      "@theme": path.resolve(__dirname, "src/theme/"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
