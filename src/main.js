import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueMarkdown from 'vue-markdown'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/global.css'
import './static/css/login.css'
import './static/css/chat.css'
import './static/css/chatMain.css'
import './static/css/feature.css'
import service from "./static/js/service"
// import contactList from "./components/recentContactList"
// import chatItem from "./components/chatItem"
import featureBlock from "./components/featureBlock"
import friendItem from "./components/friendItem"
// 引入业务逻辑组件
import contact from "./components/feature/contact"
import addNewFriend from "./components/feature/addNewFriend"
import friendRequest from "./components/feature/friendRequest"
import edit from "./components/feature/edit"


Vue.use(ElementUI)
Vue.use(mavonEditor)
// 原型链上绑定 service http请求代码
Vue.prototype.$service = service;
Vue.config.productionTip = false
// 通用组件
// Vue.component('contact-list', contactList);
// Vue.component('chat-item', chatItem);
Vue.component('feature-block', featureBlock);
Vue.component('friend-item', friendItem);
// 业务逻辑组件
Vue.component('contact', contact);
Vue.component('add-new-friend', addNewFriend);
Vue.component('friend-request', friendRequest);
Vue.component('edit', edit);

// markdown 渲染组件
Vue.component("markdown", VueMarkdown);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
