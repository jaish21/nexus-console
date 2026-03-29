import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@nexus/types": path.resolve(__dirname, "../../packages/types/src"),
      "@nexus/module-sdk": path.resolve(
        __dirname,
        "../../packages/module-sdk/src",
      ),
      "@nexus/policy-engine": path.resolve(
        __dirname,
        "../../packages/policy-engine/src",
      ),
      "@nexus/feature-flags": path.resolve(
        __dirname,
        "../../packages/feature-flags/src",
      ),
      "@nexus/shell": path.resolve(__dirname, "../../packages/shell/src"),
    },
  },
});
