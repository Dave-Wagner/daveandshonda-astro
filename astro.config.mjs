// astro.config.mjs
import { defineConfig } from "astro/config";
import netlify from '@astro/netlify/functions';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify({
    edgeMiddleware: true
  }),
  integrations: [tailwind(), react()]
});