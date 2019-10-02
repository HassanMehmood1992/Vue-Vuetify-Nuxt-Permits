import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.NODE_ENV == 'production'
            ? '/PermitPad/permitpad.ico'
            : '/permitpad.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css'
      },
      {
        href:
          'https://www.google.com/recaptcha/api.js?render=6Le-PrcUAAAAAEWTbA1MbguvRjxYDjNJIuMO1vZJ'
      }
    ]
  },

  env: {
    authUrl: 'https://dev.clickomega.aero/PermitPad/Serve/',
    adminUrl: 'https://dev.clickomega.aero/PermitPad/Serve/admin/',
    apiUrl: 'https://dev.clickomega.aero/PermitPad/Serve/api/'
  },

  router: {
    middleware: 'auth',
    base: process.env.NODE_ENV == 'production' ? '/PermitPad/' : '/'
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#d68e25' },
  loading: false,
  /*
   ** Global CSS
   */
  css: [
    // '~/assets/fonts/montserrat.css',
    { src: '~assets/global.scss', lang: 'scss' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/preload', '~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'nuxt-leaflet'
  ],

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#009668',
          accent: '#d68e25',
          secondary: '#182C1B',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          main: '#009668',
          submain: '#d68e25',
          secondaryDarker: '#122114'
        }
      }
    }
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
