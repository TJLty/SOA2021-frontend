import { createRouter, createWebHashHistory } from 'vue-router'

import login from '../views/login.vue'
import hospital from '../views/hospital'

import myReservation from '../views/myReservation'
import dept from '../views/Seldept'
import doc from '../views/Doctor'
import patientinfo from '../views/patientinfo'
import doctorinfo from '../views/doctorinfo'
import history from "../views/history"
import handing from '../views/Handing'
import hlogin from '../views/hospital_login'
import AMS from '../views/AdminModifyStudent'
import myMaterial from '../views/myMaterial'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/myMaterial',
    name: 'myMaterial',
    component: myMaterial
  },
  {
    path: '/hlogin',
    name: 'hlogin',
    component: hlogin
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: doc
  },
  {
    path: '/AMS',
    name: 'AMS',
    component: AMS
  },
  {
    path: '/handing',
    name: 'handing',
    component: handing
  },
  {
    path: '/history',
    name: 'history',
    component: history
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
  {
    path: '/pinfo',
    name: 'patientinfo',
    component: patientinfo
  },
  {
    path: '/dinfo',
    name: 'doctorinfo',
    component: doctorinfo
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: 'hash',
    base: process.env.BASE_URL,
})

export default router

