import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
    middlewareMode: false,
    headers: {},
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "apk-mime-type",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.endsWith(".apk")) {
            res.setHeader("Content-Type", "application/vnd.android.package-archive");
            res.setHeader("Content-Disposition", `attachment; filename="XitoEvents.apk"`);
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
