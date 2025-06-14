import type { Config } from "@react-router/dev/config"

export default {
  // Disable SSR (Server-Side Rendering) - keeps it as SPA
  ssr: false,

  // Configure build settings
  buildDirectory: "build",

  // Configure app directory
  appDirectory: "app",

  // Let React Router handle Fast Refresh
  fastRefresh: true,

  // Future flags for React Router v7
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },

  // Development settings
  dev: {
    overlay: false,
  },

  // Vite configuration passthrough
  vite: {
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: false,
      },
    },
    // React Router will handle React refresh
    plugins: {
      // This is correct - keep it
      react: false,
    },
    optimizeDeps: {
      force: true,
    },
    cacheDir: ".vite-cache",
  },
} satisfies Config
