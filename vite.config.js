import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueSvgPlugin from "vite-plugin-vue-svg"
import Markdown from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueSvgPlugin(), Markdown({

            }),],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
