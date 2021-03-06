import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

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
    component: () => import('@/views/settings/AccountSettings.vue'),
    meta: {
      layout: 'settings',
      sLayout: 'account',
      auth: true,
    }
  },{
    path: '/authSettings',
    name: 'authSettings',
    component: () => import('@/views/settings/AuthSettings.vue'),
    meta: {
      layout: 'settings',
      sLayout: 'auth',
      auth: true,
    }
  },{
    path: '/deleteAccount',
    name: 'deleteAccount',
    component: () => import('@/views/settings/DeleteAccountSettings.vue'),
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
  },{
    path: '/telegramUsers',
    name: 'TelegramUsers',
    component: () => import('@/views/users/TelegramUsers'),
    meta: {
      layout: 'main',
      auth: true,
    }
  },{
    path: '/appUsers',
    name: 'AppUsers',
    component: () => import('@/views/users/AppUsersTable'),
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/auth/Auth.vue'),
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


router.beforeEach((to, from , next) => {
  const requireAuth = to.meta.auth
  const isAuthed = store.getters['auth/isAuthed']

  if (requireAuth && isAuthed) {
    next()
  } else if (requireAuth && !isAuthed) {
    next('/login?message=needAuthorization')
  } else if (!requireAuth && isAuthed) {
    next('/')
  } else {
    next()
  }
})

export default router
