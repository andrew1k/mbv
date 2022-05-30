import { createStore } from 'vuex'
import auth from "@/store/auth.js";
import tasks from "./tasks";

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
  }
})
