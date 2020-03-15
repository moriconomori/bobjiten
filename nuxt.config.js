import axios from 'axios'
import fs from 'fs-extra'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'カタヌキ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'カタカナ言葉をカタカナ抜きで説明しよう！',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  server: {
    host: '0.0.0.0',
  },

  hooks: {
    build: {
      async before(builder) {
        const dest = './assets/data/'
        const data = [
          {
            fileName: 'words.json',
            url:
              'https://script.google.com/macros/s/AKfycbws3-V2qvM3RY3rLlmtw_D0cmeYHWbf8xUJx_cnQ885x_Cs3cU/exec',
          },
        ]

        for (let i = 0; i < data.length; i++) {
          const filePath = dest + data[i].fileName
          const json = (await axios.get(data[i].url)).data
          fs.outputFile(filePath, JSON.stringify(json))
          // eslint-disable-next-line no-console
          console.log('[HOOK][before build] Generated ' + filePath)
        }
      },
    },
  },
}
