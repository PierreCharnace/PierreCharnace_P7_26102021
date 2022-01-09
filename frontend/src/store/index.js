import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const instance = axios.create ({
  baseURL: 'http://localhost:3000/api/'
});

Vue.use(Vuex)

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
      profilePicture:'',
    }
  },// mettre pattern pour register

  mutations: {
    setStatus: function (state, status) {
      state.status =  status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Autorization'] = user.token;
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
      instance.post('/infos')
        .then(function (response) {
          commit('userInfos', response.data.infos);
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function () {
        })
    }
  },
  modules: {
  }
})
