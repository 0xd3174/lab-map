import { defineConfig } from "vite";

import { svelte } from "@sveltejs/vite-plugin-svelte";

import visualizer from "rollup-plugin-visualizer";
import yaml from "@rollup/plugin-yaml";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), yaml(), visualizer({ gzipSize: true, brotliSize: true })],
});
