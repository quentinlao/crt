import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/crt/", // Base path for GitHub Pages
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    postcss: "./postcss.config.cjs",
  },
});
