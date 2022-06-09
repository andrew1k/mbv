import axios from 'axios'
// import store from '@/store'
// import router from '@/router'

const api = axios.create({
    baseURL: process.env.VUE_APP_DB_URL
})

api.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        // store.dispatch('auth/updateToken')
        // router.push('/login')
    }
    return Promise.reject(error)
})

export default api