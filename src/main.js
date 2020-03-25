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

import contact from "./components/feature/contact"


Vue.use(ElementUI)
Vue.prototype.$service = service;
Vue.config.productionTip = false
// 通用组件
Vue.component('contact-list', contactList);
Vue.component('chat-item', chatItem);
Vue.component('feature-block', featureBlock);
// 业务逻辑组件
Vue.component('contact', contact);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
