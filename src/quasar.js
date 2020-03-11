import Vue from 'vue'

import 'quasar/dist/quasar.css'
import lang from 'quasar/lang/ja.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {},
  lang: lang,
})
