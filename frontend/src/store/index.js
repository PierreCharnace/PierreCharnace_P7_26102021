import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const instance = axios.create ({
  baseURL: 'http://localhost:3000/api/'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    createAccount: ({commit}, userInfos) => { 
       commit;
       instance.post('/users/register', userInfos,)
       .then(function (response) {
         console.log(response, 'youhou');
       })
       .catch(function (error) {
         console.log(error,"youhou");
       })
    }
  },
  modules: {
  }
})
