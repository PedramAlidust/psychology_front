const pkg = require('./package')

module.exports = {
  ssr: true,
  telemetry: false,

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'stylesheet', href: '/abf/css/mdb-min.css' }   
    ],
    script: [
      { src: '/abf/js/bootstrap/bootstrap.bundle.min.js', body: true },
      { src: '/abf/js/jquery/jquery-3-6-0-min.js', body: true },
      { src: '/abf/js/bootstrap/mdb-min.js', body: true },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/general_style.css',
    '~/assets/bootstrap/bootstrap.rtl.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    //Axios for requests
    "@nuxtjs/axios",

    //Cookies With options
    ["cookie-universal-nuxt", { alias: "cookiz" }],

    //pwa
    '@nuxtjs/pwa',
  ],

   /*
   ** Build configuration
   */
   buildModules: [
    '@nuxtjs/pwa',
  ],


  /* Set envirement variable */
  env: {
    UrlApi: "https://api.siteyek.com",
  },
  
  pwa: {
    manifest: {
      name: 'siteyek',
    },
  },
  
  /* run app in subdirectory */  
  router: {      
    base: '/abf/'
  }
  
}
