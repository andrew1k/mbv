import axios from 'axios'

export default {
  namespaced: true,
  state() {
    // let stateVar = ['idToken', 'localId', 'email',
    //   'refreshToken', 'expiresIn', 'authLevel',
    //   'servTeam', 'birthDate', 'firstName',
    //   'secondName', 'personGender', 'phoneNumber',
    //   'telegramFirstName', 'telegramId', 'telegramIsAuthorized',
    //   'telegramUserName']

    return {
        idToken: localStorage.getItem('idToken'),
        localId: localStorage.getItem('localId'),
        refreshToken: localStorage.getItem('refreshToken'),
        expiresIn: localStorage.getItem('expiresIn'),
        email: localStorage.getItem('email'),
        authLevel: localStorage.getItem('authLevel'),
        servTeam: localStorage.getItem('servTeam'),
        birthDate: localStorage.getItem('birthDate'),
        firstName: localStorage.getItem('firstName'),
        secondName: localStorage.getItem('secondName'),
        personGender: localStorage.getItem('personGender'),
        phoneNumber: localStorage.getItem('phoneNumber'),
        telegramFirstName: localStorage.getItem('telegramFirstName'),
        telegramId: localStorage.getItem('telegramId'),
        telegramIsAuthorized: localStorage.getItem('telegramIsAuthorized'),
        telegramUserName: localStorage.getItem('telegramUserName'),
    }
  },
  mutations: {
    setJwtToken(state, payload) {
      state.idToken = payload.idToken
      state.localId = payload.localId
      state.refreshToken = payload.refreshToken
      state.expiresIn = payload.expiresIn
      for (let item in payload) {
        localStorage.setItem(`${item}`, payload[item])
      }
    },
    setAppUser(state, payload) {
      state.appUser = {...payload}
      for (let item in payload) {
        localStorage.setItem(`${item}`, payload[item])
      }
    },
    logout(state) {
      state.idToken = null
      state = null
      localStorage.removeItem('idToken')
      localStorage.clear()
    },
  },
  actions: {
    async login({commit}, payload) {
      try {
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, {
          ...payload,
          returnSecureToken: true,
        })
        await commit('setJwtToken', data)
        const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json?auth=${data.idToken}`)
        await commit('setAppUser', dbData)
      } catch (e) {
        console.log(e)
        alert('Неверный email или пароль!')
      }
    },
    async updateToken({commit}) {
      try {
        const {data} = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`, {
          grant_type: refresh_token,
          refresh_token: localStorage.getItem('refreshToken'),
        })
        commit('setJwtToken', {
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          localId: data.user_id,
          expiresIn: data.expires_in,
        })
      } catch (e) {
        console.log(e)
      }
    },
    async signup({commit}, payload) {
      try {
        const toAuth = {email: payload.email, password: payload.password, returnSecureToken: true}
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`, toAuth)
        await commit('setJwtToken', data)
        let toDB = {
          email: payload.email,
          firstName: payload.firstName,
          secondName: payload.secondName,
          birthDate: Date.parse(payload.birthDate),
          phoneNumber: '+7',
          personGender: payload.personGender,
          authLevel: 5,
          servTeam: 'guest',
        }
        await axios.put(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json?auth=${data.idToken}`, toDB)
        await commit('setAppUser', toDB)
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, проверте правильность введенных вами данных')
      }
    },
    async forgotPassword({commit}, payload) {
      try {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_API_KEY}`, {
          'X-Firebase-Locale': 'ru',
          'requestType': 'PASSWORD_RESET',
          'email': payload.email,
        })
        alert(`Мы отправили ссылку для восстановления пароля вам на почту ${payload.email}`)
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, проверте правильность введенных вами данных')
      }
    },
    async logout({commit}) {
      try {
        commit('logout')
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, повторите попытку через несколько минут')
      }
    },
    async updateData({commit, state}, payload) {
      try {
        await axios.patch(`${process.env.VUE_APP_DB_URL}/appUsers/${localStorage.getItem('localId')}.json?auth=${localStorage.getItem('idToken')}`, {...payload})
        const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${localStorage.getItem('localId')}.json?auth=${localStorage.getItem('idToken')}`)
        await commit('setAppUser', dbData)
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, проверте правильность введенных вами данных')
      }
    },
    async changePassword({commit}, payload) {
      try {
        const toAuth = {
          email: localStorage.getItem('email'),
          password: payload.password,
          returnSecureToken: true,
        }
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, toAuth)
        const newLoginData = {
          idToken: data.idToken,
          password: payload.newPassword,
          returnSecureToken: true,
        }
        const {data: newAuthData} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_API_KEY}`, newLoginData)
        await commit('setJwtToken', newAuthData)
        alert('Пароль успешно обновлен')
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, проверте правильность введенных вами данных')
      }
    },
    async changeEmail({commit}, payload) {
      try {
        const toAuth = {
          idToken: localStorage.getItem('idToken'),
          email: payload.email,
          returnSecureToken: true,
        }
        const {data: newAuthData} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_API_KEY}`, toAuth)
        await commit('setJwtToken', newAuthData)
        await axios.patch(`${process.env.VUE_APP_DB_URL}/appUsers/${newAuthData.localId}.json=auth=${newAuthData.idToken}`, {email: newAuthData.email})
        const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${newAuthData.localId}.json=auth=${newAuthData.idToken}`)
        await commit('setAppUser', dbData)
        alert('Вы успешно поменяли email')
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, проверте правильность введенных вами данных')
      }
    },
    async deleteAccount({commit}, payload) {
      try {
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, {
          ...payload, returnSecureToken: true,
        })
        await axios.delete(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json?auth=${data.idToken}`)
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_API_KEY}`, {idToken: data.idToken})
        commit('logout')
      } catch (e) {
        console.log(e)
        alert('Что-то пошло не так, проверте правильность введенных вами данных')
      }
    },
  },
  getters: {
    idToken(state) {
      return state.idToken
    },
    isAuthed(_, getters) {
      return !!getters.idToken
    },
  },
}