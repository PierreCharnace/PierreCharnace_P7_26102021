import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const instance = axios.create ({
  baseURL: 'http://localhost:3000/api/'
});
let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
}

Vue.use(Vuex)
//create a new store instance
export default new Vuex.Store({
  state: {
    status: '',
    user: {
      userId: -1,
      token: '',
    },
    userInfos: {
      lastName: '',
      firstName:'',
      email: '',
      profilePicture:'',
    }
  },// mettre pattern pour register

  mutations: {
    setStatus: function (state, status) {
      state.status =  status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = ('Bearer', user.token);
      localStorage.setItem('user', user)
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
  },
  actions: { /**create account *****************/
    createAccount: ({commit}, userInfos) => { 
      return new Promise((resolve, reject) => {
        commit('setStatus', 'loading',);
        instance.post('/users/register', userInfos)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        })
      })
    },  /**Algo for login ***************************/
    login: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        commit('setStatus', 'loading');
        instance.post('/users/login', userInfos)
        .then(function (response) {
          commit('setStatus', 'loading');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        })
      })
    },
    getUserInfos: ({commit}) => {
      instance.get('/users/userProfile')
        .then(function (response) {
          commit('userInfos', response.data.userProfile);
          resolve(response);
        })
        .catch(function () {
        })
    }
  },
  modules: {
  }
})
