import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  root: "./app",
  plugins: [tailwindcss(), react(), tsconfigPaths(), reactRouter()],   
  // publicDir : path.resolve(__dirname, 'app'),  
});
