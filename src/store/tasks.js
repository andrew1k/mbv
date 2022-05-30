import axios from "axios";
import data from "v-calendar";

export default {
    namespaced: true,
    mutations: {
        // changesTask(state, idNote) {
        //     state.idNote = idNote
        //     localStorage.setItem('changes-task', idNote)
        // },
        // deleteTask(state, idNote) {
        //     state.idNote = idNote
        //     localStorage.setItem('delete-task', idNote)
        // },
        // saveInstate(state, nameNote) {
        //     state.nameNote = nameNote
        // },
        noteInCalendar(state, nameTask) {
            state.nameTask = nameTask
            // ????
        },
    },
    actions: {
        async noteInCalendar({commit}, payload) {
            //     const {data} = await axios.post(`${process.env.VUE_APP_DB_URL}/calendar/${task.idNote}.json`)
            try{
                await commit('saveInstate', payload)
                await axios.post(`${process.env.VUE_APP_DB_URL}/calendar/1.json`, payload)
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
    }
}