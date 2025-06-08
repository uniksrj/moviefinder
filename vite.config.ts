import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  root: "./app",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),cssInjectedByJsPlugin()],
   build: {
    outDir: '../build/client',
    manifest: true,
    rollupOptions: {
      input: '/src/entry.client.tsx' 
    }
  },
  // publicDir : path.resolve(__dirname, 'app'),  
});
