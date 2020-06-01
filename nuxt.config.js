const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'sign-me-out',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Team Management WebApp' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { 
        rel: 'stylesheet', 
        //rel: 'preload',
        //as: 'style',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' 
      }
    ]
  },
  workbox: {
    cachingExtensions: '@/plugins/workbox-range-request.js'
  },
  meta: {
    
  },
  manifest: {
    name: "Sign Me Out",
    short_name: "SMO",
    start_url: "/index.html",
    display: "standalone",
    background_color: "#fff",
    description: "Keep your team mates informed",
    icons: [{
      src: "logo.png",
      sizes: "48x48",
      type: "image/png"
    }],
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/firebase.js',
    '~/plugins/fireauth.js',
    //'~/plugins/sw.js'
  ],
  //modules: [
  //  '@nuxtjs/pwa'
  //],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  router: {
    //middleware: 'router-auth'
  },
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          //loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
