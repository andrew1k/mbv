import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

// Все компоненты, кроме home, лучше LazyLoad
// component: () => import('@/')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
    }
  },  {
    path: '/accountSettings',
    name: 'Settings',
    component: () => import('@/views/Settings/AccountSettings.vue'),
    meta: {
      layout: 'settings',
      sLayout: 'account',
      auth: true,
    }
  },{
    path: '/authSettings',
    name: 'authSettings',
    component: () => import('@/views/Settings/AuthSettings.vue'),
    meta: {
      layout: 'settings',
      sLayout: 'auth',
      auth: true,
    }
  },{
    path: '/deleteAccount',
    name: 'deleteAccount',
    component: () => import('@/views/Settings/DeleteAccountSettings.vue'),
    meta: {
      layout: 'settings',
      sLayout: 'delete-account',
      auth: true,
    }
  },{
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/views/calendar/Calendar'),
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./views/auth/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    }
  },{
    path: '/login',
    name: 'AuthLogin',
    component: () => import('@/views/auth/Login'),
    meta: {
      layout: 'auth',
      action: 'auth-login',
      auth: false
    },
  },{
    path: '/signup',
    name: 'AuthSignup',
    component: () => import('@/views/auth/Signup'),
    meta: {
      layout: 'auth',
      action: 'auth-signup',
      auth: false,
    },
  },{
    path: '/restorePassword',
    name: 'AuthRestorePass',
    component: () => import('@/views/auth/RestorePassword'),
    meta: {
      layout: 'auth',
      action: 'forgot-pass',
      auth: false,
    },
  },{
    path: '/restoreMessageSent',
    name: 'restoreMessageSent',
    component: () => import('@/views/auth/RestoreMessageSent'),
    meta: {
      layout: 'auth',
      action: 'forgot-pass',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Проверка регистрации/входа перед редиректом в главное меню
router.beforeEach((to, from , next) => {
  // boolean переменная запрашивающая нужна ли регистрация для модуля
  const requireAuth = to.meta.auth
  // boolean переменная передающая, есть ли jwt-token
  const isAuthed = store.getters['auth/isAuthed']
  // если нужна регистрация и есть токен next()
  if (requireAuth && isAuthed) {
    next()
  // если нужна регистрация и нет токена то перенаправление в auth
  } else if (requireAuth && !isAuthed) {
    next('/login?message=needAuthorization')
  } else if (!requireAuth && isAuthed) {
    next('/')
  } else {
    next()
  }
})

export default router
