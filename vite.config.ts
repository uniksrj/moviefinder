import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),cssInjectedByJsPlugin()],
   build: {
    sourcemap: true, 
    ssr: false 
  }
});
