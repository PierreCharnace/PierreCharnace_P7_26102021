import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const instance = axios.create ({
  baseURL: 'http://localhost:3000/api/'
});
let emailLocal = JSON.parse(localStorage.getItem('emailLocal'));
let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
}else {
  try {
      user = JSON.parse(user);
      instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    }
  }

}

Vue.use(Vuex)
//create a new store instance
export default new Vuex.Store({
  
  state: {
    status: '',
    user: {
      userId: -1,
      token: '',
    },// For profile view//////////////////
    userInfos: {
      lastName: '',
      firstName:'',
      email: '',
      profilePictures:'',
      deletedAt:'',
      isModo: false,
      isAdmin: false,
    },
    post: {
      title: '',
      content: '',
      attachment: '',
      createdAt:'',
      updatedAt:'',
      deletedAt:'',
    },
    Comment: {
      content: '',
      userId:'',
      postId:'',
    }
  },// mettre pattern pour register

  mutations: {
    setStatus: function (state, status) {
      state.status =  status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user))//save user
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user')
    }
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
          commit(localStorage.setItem('emailLocal', JSON.stringify(this.email)));
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
          commit('userInfos', response.data);
          console.log(response.data);
          resolve(response);
        })
        .catch(function () {
        })
    },
  },
  modules: {
  }
})
