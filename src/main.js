import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router.js'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'mdb-vue-ui-kit/css/mdb.min.css';


createApp(App).use(store).use(router).mount('#app')
