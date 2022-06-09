import axiosDBRequests from '@/axios/dbRequests'
import store from '@/store'
export default {
  namespaced: true,
  state() {
    return {
      usersData: {},
    }
  },
  mutations: {
    setData(state, payload) {
      state.usersData = {...payload}
      localStorage.setItem('servTeam', payload.servTeam)
      localStorage.setItem('authLevel', payload.authLevel)
    }
  },
  actions: {
    async loadData({commit}) {
      const { data: dbData } = await axiosDBRequests.get(`/appUsers.json?auth=${store.getters['auth/idToken']}`)
      await commit('setData', dbData)
    },
    async saveData({commit}, payload) {
      const toDB = {
        authLevel: payload.authLevel,
        servTeam: payload.servTeam,
      }
      await axiosDBRequests.patch(`/appUsers/${payload.localId}.json?auth=${store.getters['auth/idToken']}`, toDB)
      await commit('setData', toDB)
    }
  },
  getters: {
    usersData(state) {
      return state.usersData
    }
  }
}