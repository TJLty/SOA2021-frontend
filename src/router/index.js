import { createRouter, createWebHashHistory } from 'vue-router'

import login from '../views/login.vue'
import hospital from '../views/hospital'
import home from '../views/home'
import myReservation from '../views/myReservation'
import dept from '../views/Seldept'
import doc from '../views/Doctor'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: doc
  },
  {
    path: '/myReservation',
    name: 'myReservation',
    component: myReservation
  },
  {
    path: '/dept',
    name: 'dept',
    component: dept
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: hospital
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: 'hash',
    base: process.env.BASE_URL,
})

export default router

