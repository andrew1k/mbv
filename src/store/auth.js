import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem('token'),
            localId: localStorage.getItem('localId'),
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
            state.token = payload.token
            state.localId = payload.localId
            localStorage.setItem('token', payload.token)
            localStorage.setItem('localId', payload.localId)
        },
        setAppUser(state, payload) {
            state.appUser = {...payload}
            for (let item in payload){
                localStorage.setItem(`${item}`, payload[item])
            }
        },
        logout(state) {
            state.token = null
            state = null
            localStorage.removeItem('token')
            localStorage.clear()
        },
    },
    actions: {
        async login({commit}, payload) {
            try {
                const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, {
                    ...payload,
                    returnSecureToken: true})
                await commit('setJwtToken', {token: data.idToken, localId: data.localId})
                const { data: dbData } = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json?auth=${data.idToken}`)
                await commit('setAppUser', dbData)
            } catch (e) {
                console.log(e)
                alert('Неверный email или пароль!')
            }
        },
        async signup({commit}, payload) {
            try {
                const toAuth = {email: payload.email, password: payload.password, returnSecureToken: true}
                const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`, toAuth)
                await commit('setJwtToken', {token: data.idToken, localId: data.localId})
                let toDB = {email: payload.email,
                            firstName: payload.firstName,
                            secondName: payload.secondName,
                            birthDate: Date.parse(payload.birthDate),
                            phoneNumber: '+7',
                            personGender: payload.personGender,
                            authLevel: 5,
                            servTeam: 'guest'}
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
                    "X-Firebase-Locale": "ru",
                    "requestType": "PASSWORD_RESET",
                    "email": payload.email
                })
                alert(`Мы отправили ссылку для восстановления пароля вам на почту ${payload.email}`)
            } catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async logout({commit}) {
            try { commit('logout') }
            catch (e) {
                console.log(e)
                alert('Что-то пошло не так, повторите попытку через несколько минут')}
        },
        async updateData({commit, state}, payload) {
            try {
                await axios.patch(`${process.env.VUE_APP_DB_URL}/appUsers/${localStorage.getItem('localId')}.json?auth=${localStorage.getItem('token')}`, {...payload})
                const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${localStorage.getItem('localId')}.json?auth=${localStorage.getItem('token')}`)
                await commit('setAppUser', dbData)
            } catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async changePassword({ commit }, payload) {
            try {
                const toAuth = {email: localStorage.getItem('email'),
                                password: payload.password,
                                returnSecureToken: true}
                const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, toAuth)
                const newLoginData = {  idToken: data.idToken,
                                        password: payload.newPassword,
                                        returnSecureToken: true}
                const { data: newAuthData } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_API_KEY}`, newLoginData)
                await commit('setJwtToken', {token: newAuthData.idToken, localId: newAuthData.localId})
                alert('Пароль успешно обновлен')
            }  catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async changeEmail({ commit }, payload) {
            try {
                const toAuth = {idToken: localStorage.getItem('token'),
                                email: payload.email,
                                returnSecureToken: true}
                const { data: newAuthData } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_API_KEY}`, toAuth)
                await commit('setJwtToken', {token: newAuthData.idToken, localId: newAuthData.localId})
                await axios.patch(`${process.env.VUE_APP_DB_URL}/appUsers/${newAuthData.localId}.json=auth=${newAuthData.idToken}`, {email: newAuthData.email})
                const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${newAuthData.localId}.json=auth=${newAuthData.idToken}`)
                await commit('setAppUser', dbData)
                alert('Вы успешно поменяли email')
            }  catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async deleteAccount({ commit }, payload) {
            try {
                const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, {
                    ...payload, returnSecureToken: true})
                await axios.delete(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json?auth=${data.idToken}`)
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_API_KEY}`, {idToken: data.idToken})
                commit('logout')
            } catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthed(_, getters) {
            return !!getters.token
        },
    }
}