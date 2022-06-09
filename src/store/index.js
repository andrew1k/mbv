import { createStore } from 'vuex'
import auth from '@/store/auth.module'
import tasks from './tasks.module'
import usersData from './usersData.module'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    tasks,
    usersData,
  }
})
