import axios from 'axios'
import moment from 'moment'

export default {
    namespaced: true,
    actions: {
        async noteInCalendar({ commit }, payload) {
            try{
                await axios.put(`${process.env.VUE_APP_DB_URL}/calendar/${payload.date}/${moment().format('x')}.json`, payload)
            } catch (e) {
                    console.log(e)
                    alert('Что-то пошло не так, проверте правильность введенных вами данных')
                }
        },
        async getTasks({ commit }) {
            const { data } = axios.get(`${process.env.VUE_APP_DB_URL}/calendar.json?auth=${localStorage.getItem('token')}`)
            return data
        }
    },
}