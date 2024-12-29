// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles.css"],
  devtools: { enabled: true },
  compatibilityDate: "2024-12-29",
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});