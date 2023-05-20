import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    bundle: true,
    clean: true,
    outDir: "./dist",
    entry: ["./src/index.ts", "./src/tracing.ts"],
    include: ["./src/**/*.ts"],
  };
});
