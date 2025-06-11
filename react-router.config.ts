import type { Config } from "@react-router/dev/config"

export default {
  // Disable SSR (Server-Side Rendering) - keeps it as SPA
  ssr: false,

  // Configure build settings
  buildDirectory: "build",

  // Configure app directory
  appDirectory: "app",

  // Future flags for React Router v7
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },

  // Development settings to help with the RefreshRuntime issue
  dev: {
    // Disable overlay errors that might conflict with Fast Refresh
    overlay: false,
  },

  // Vite configuration passthrough
  vite: {
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: false, // Disable HMR overlay to prevent conflicts
      },
    },
    optimizeDeps: {
      force: true, // Force re-optimization of dependencies
    },
    // Clear cache settings
    cacheDir: ".vite-cache",
  },
} satisfies Config
