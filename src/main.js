import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/global.css'
import './static/css/login.css'
import http from "./static/js/http"


Vue.use(ElementUI)
Vue.prototype.$http = http;

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
