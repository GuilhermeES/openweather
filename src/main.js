import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


/*Main css*/
import '@/assets/main.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
