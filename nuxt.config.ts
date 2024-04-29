import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    //'~/assets/css/main.css',
    "primevue/resources/themes/lara-dark-teal/theme.css",

    "primeicons/primeicons.css",
  ],

  plugins: [
  ],

  modules: [
    //"@nuxt/ui",
    "@nuxt/eslint",
    "nuxt-primevue",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },
  ssr: false,
});
