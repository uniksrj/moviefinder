import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { reactRouter } from "@react-router/dev/vite"

// Remove the react() plugin - let React Router handle React refresh
export default defineConfig({
  root: "./app",
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    // Let React Router handle React and its refresh
    reactRouter(),
  ],
  server: {
    hmr: true,
  },
})
