import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router.js'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import 'v-calendar/dist/style.css'
import VCalendar from 'v-calendar'

createApp(App)
    .use(VCalendar, {})
    .use(store)
    .use(router)
    .mount('#app')