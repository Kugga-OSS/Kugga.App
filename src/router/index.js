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
    component: login,
    meta: {isPublic: true}
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    props: true,
    meta: {isPublic: true}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {isPublic: true}
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
        path: 'with/:id',
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

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
})

export default router
