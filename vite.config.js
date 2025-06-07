// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mi Rutina Saludable",
        short_name: "RutinaSalud",
        description: "Ejercicio y nutrición para pacientes diabéticos",
        theme_color: "#6366f1",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www.gstatic.com\/firebasejs\//,
            handler: "CacheFirst",
            options: { cacheName: "firebase-cdn" }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" }
          },
          {
            urlPattern: /^\/assets\/.*\.(png|jpg|jpeg|svg|mov|mp4)$/,
            handler: "CacheFirst",
            options: { cacheName: "media-assets" }
          }
        ]
      }
    })
  ],
  // ...el resto de tu configuración (darkMode, content, theme, etc.)
});
