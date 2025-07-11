import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy all requests starting with /api to backend at localhost:5000
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false,
                // Optional: rewrite path if needed
                // rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
    },
});
