import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/global.css'
import './static/css/login.css'
import './static/css/chat.css'
import './static/css/chatMain.css'
import './static/css/feature.css'
import service from "./static/js/service"
import contactList from "./components/recentContactList"
import chatItem from "./components/chatItem"
import featureBlock from "./components/featureBlock"
import floatBox from "./components/floatBox"

Vue.use(ElementUI)
Vue.prototype.$service = service;
Vue.config.productionTip = false

Vue.component('contact-list', contactList);
Vue.component('chat-item', chatItem);
Vue.component('feature-block', featureBlock);
Vue.component('float-box', floatBox);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
