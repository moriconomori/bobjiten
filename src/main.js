import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import 'vue2-animate/dist/vue2-animate.min.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
