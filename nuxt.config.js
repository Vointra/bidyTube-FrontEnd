export default {
  target: "static",

  head: {
    title: "bidyTube",
    htmlAttrs: {
      lang: "id",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Download Video YouTube Gratis" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "/assets/css/style.css" }
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        body: true,
      },
    ],
  },

  css: [], // kosong, karena kita load via link di atas

  components: true,

  plugins: [
    { src: "~/plugins/api.js", mode: "client" },
  ],

  modules: ["@nuxtjs/axios", "nuxt-sweetalert2"],

  axios: {
    baseURL: "/",
  },

  env: {
    API_URL: process.env.API_URL,
  },
};
