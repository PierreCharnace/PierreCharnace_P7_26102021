import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home , Footer, Header',
    component: Home, Header, Footer
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import( '../views/Profile.vue')
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import( '../views/Wall.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
