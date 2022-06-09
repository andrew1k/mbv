import { createStore } from 'vuex'
import auth from '@/store/modules/auth.module'
import tasks from './modules/calendarTasks.module'
import usersData from './modules/usersData.module'

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
