import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@axis/types": path.resolve(__dirname, "../../packages/types/src"),
      "@axis/module-sdk": path.resolve(
        __dirname,
        "../../packages/module-sdk/src",
      ),
      "@axis/policy-engine": path.resolve(
        __dirname,
        "../../packages/policy-engine/src",
      ),
      "@axis/shell": path.resolve(__dirname, "../../packages/shell/src"),
    },
  },
});
