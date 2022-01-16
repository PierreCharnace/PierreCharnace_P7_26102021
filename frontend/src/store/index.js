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
} else {
  try {
      user = JSON.parse(user);
      instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }

}

Vue.use(Vuex)
//create a new store instance
export default new Vuex.Store({
  
  state: {
    status: '',
    user,// For profile view//////////////////
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
    },
    
  },// mettre pattern pour register

  mutations: {
    setStatus: function (state, status) {
      state.status =  status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user))//save user in localStorage
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
      localStorage.removeItem('user');
      localStorage.removeItem('emailLocal');

    },/*
    user: function(state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      state.user = user
    },*/
  
  },
  actions: { /**Algo for login ***************************/
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/users/login', userInfos)
        .then(function (response) {
          commit('setStatus', 'regLastName');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        })
      })
    },/**create account *****************/
    createAccount: ({commit}, userInfos) => { 
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
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
    },  
    getUserInfos: ({commit}) => {
      instance.get('/users/userProfile')
        .then(function (response) {
          commit('userInfos', response.data);
        })
        .catch(function (err) {
          commit('setStatus');
          reject(err)
        })
    },
   /* updateProfile: ({commit, user}) => {
      commit;
      console.log(user);
      instance.put('/users/userProfile')
        .then(function (request) {
          commit('user',)
          console.log('-->', user);
   
        })
        .catch(function (err) {
          reject(err)
         })
    }*/
  },
  modules: {
  }
})
