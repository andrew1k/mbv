import axios from "axios";

export default {
    namespaced: true,
    // регистрация токена в state
    state() {
        return {
            token: localStorage.getItem('jwt-token')
        }
    },
    // Мутации для изменения state
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('jwt-token', token)
        },
        setEmail(state, email) {
            state.email = email
            localStorage.setItem('email', email)
        },
        setFirstName(state, firstName) {
            state.firstName = firstName
            localStorage.setItem('first-name', firstName)
        },
        setSecondName(state, secondName) {
            state.secondName = secondName
            localStorage.setItem('second-name', secondName)
        },
        setLocalId(state, localId) {
            state.localId = localId
            localStorage.setItem('local-id', localId)
        },
        setPhoneNumber(state, phoneNumber) {
            state.phoneNumber = phoneNumber
            localStorage.setItem('phone-number', phoneNumber)
        },
        setBirthDate(state, birthDate) {
            state.birthDate = birthDate
            localStorage.setItem('birth-date', birthDate)
        },
        logout(state) {
            state.token = null
            state.email = null
            state.localId = null
            state.firstName = null
            state.secondName = null
            state.phoneNumber = null
            state.birthDate = null
            localStorage.removeItem('jwt-token')
            localStorage.removeItem('email')
            localStorage.removeItem('local-id')
            localStorage.removeItem('first-name')
            localStorage.removeItem('second-name')
            localStorage.removeItem('phone-number')
            localStorage.removeItem('birth-date')
        }
    },
    // Действия с мутациями при помощи commit, в payload данные values с полей
    actions: {
        // После отправки приходит ответ с 'idToken', который записывается в localStorage
        async login({commit}, payload) {
            try {
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, {
                    ...payload,
                    returnSecureToken: true
                })
                await commit('setToken', data.idToken)
                await commit('setLocalId', data.localId)
                await commit('setEmail', data.email)
                const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json`)
                await commit('setFirstName', dbData.firstName)
                await commit('setSecondName', dbData.secondName)
                await commit('setPhoneNumber', dbData.phoneNumber)
                await commit('setBirthDate', dbData.birthDate)
            } catch (e) {
                console.log('from login: \n' + e)
                alert('Неверный email или пароль!')
            }
        },
        // в signup помимо клучей email и password приходят firstName, secondName и date в значении yyyy-dd-mm(date нужно распарсить)
        // для регистрации требуется только email & password, после приходит ответа с сервера с jwt-token
        // затем через commit вызывается мутация записывающая токен в localStorage
        // после записывает данные email, firstName, secondName и date в DB
        async signup({commit}, payload) {
            try {
                let toAuth = {email: payload.email, password: payload.password, returnSecureToken: true}
                let birthDate = Date.parse(payload.birthDate)
                let toDB = {
                    email: payload.email,
                    firstName: payload.firstName,
                    secondName: payload.secondName,
                    birthDate: birthDate,
                    phoneNumber: `+7`,
                }
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`, toAuth)
                await commit('setToken', data.idToken)
                await commit('setLocalId', data.localId)
                await commit('setEmail', data.email)
                await axios.put(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json`, toDB)
                const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json`)
                await commit('setFirstName', dbData.firstName)
                await commit('setSecondName', dbData.secondName)
                await commit('setPhoneNumber', dbData.phoneNumber)
                await commit('setBirthDate', dbData.birthDate)
            } catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async forgotPassword({commit}, payload) {
            try {
                let {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_API_KEY}`, {
                    "requestType": "PASSWORD_RESET",
                    "email": payload.email
                })
                await commit('setRestoreEmail', data.email)
                console.log(`Sent email to ${data.email}`)
            } catch (e) {
                console.log('from forgotPassword: \n' + e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async logout({commit}) {
            try {
                commit('logout')
            } catch (e) {
                console.log('from logout: \n' + e)
            }
        },
        async updateData({commit}, payload) {
            try {
                const id = localStorage.getItem('local-id')
                let birthDate = Date.parse(payload.birthDate)
                let toDB = {
                    email: payload.email,
                    firstName: payload.firstName,
                    secondName: payload.secondName,
                    birthDate: birthDate,
                    phoneNumber: payload.phoneNumber,
                }
                await axios.patch(`${process.env.VUE_APP_DB_URL}/appUsers/${id}.json`, toDB)
                const {data: dbData} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers/${id}.json`)
                await commit('setFirstName', dbData.firstName)
                await commit('setSecondName', dbData.secondName)
                await commit('setPhoneNumber', dbData.phoneNumber)
                await commit('setBirthDate', dbData.birthDate)
            } catch (e) {
                console.log('from updateData: \n' + e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async changePassword({commit}, payload) {
            try {
                const email = localStorage.getItem('email')
                const loginData = {
                    email: email,
                    password: payload.password,
                    returnSecureToken: true
                }
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, loginData)
                const newLoginData = {
                    idToken: data.idToken,
                    password: payload.newPassword,
                    returnSecureToken: true
                }
                const {data: newData} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_API_KEY}`, newLoginData)
                await commit('setToken', newData.idToken)
                await commit('setLocalId', newData.localId)
                await commit('setEmail', newData.email)
            } catch (e) {
                console.log('from changePassword: \n' + e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async changeEmail({commit}, payload) {
            try {
                const loginData = {
                    idToken: localStorage.getItem('jwt-token'),
                    email: payload.email,
                    returnSecureToken: true
                }
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_API_KEY}`, loginData)
                await commit('setToken', data.idToken)
                await commit('setEmail', data.email)
                await commit('setLocalId', data.localId)
                const id = localStorage.getItem('local-id')
                const toDB = {email: data.email}
                await axios.patch(`${process.env.VUE_APP_DB_URL}/appUsers/${id}.json`, toDB)
                alert('Вы успешно поменяли email')
            } catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        },
        async deleteAccount({commit}, payload) {
            try {
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, {
                    ...payload,
                    returnSecureToken: true
                })
                await axios.delete(`${process.env.VUE_APP_DB_URL}/appUsers/${data.localId}.json`)
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_API_KEY}`, {idToken: data.idToken})
                await commit('logout')
            } catch (e) {
                console.log(e)
                alert('Что-то пошло не так, проверте правильность введенных вами данных')
            }
        }
    },
    // getter для чтения без изменения state
    // в геттере token доступ до токена и isAuthed boolean значение указывающее на присутствие токена
    getters: {
        token(state) {
            return state.token
        },
        isAuthed(_, getters) {
            return !!getters.token
        }
    }
}