import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import chat from '../views/chat.vue'
import chatMain from '../views/chatMain.vue'
import defaultView from '../views/defaultView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat,
    children: [
      {
        path: 'with',
        name: 'defaultView',
        component: defaultView
      },
      {
        path: 'with/:people',
        name: 'chatMain',
        component: chatMain,
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
