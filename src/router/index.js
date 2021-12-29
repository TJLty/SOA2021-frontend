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
import myMaterial from '../views/myMaterial'
import workManagement from "@/views/workManagement";



const routes = [
 
  {
    path: '/invitation',
    name: 'invitation',
    component: () => import( '../views/invitation.vue')
  },
  {
    path: '/doctor-manage',
    name: 'doctorManage',
    component: () => import( '../views/doctorManage.vue')
  }, {
    path: '/dept-manage',
    name: 'dept-manage',
    component: () => import( '../views/deptManage.vue')
  },
  {
    path: '/hospital-material-upload',
    name: 'material-upload',
    component: () => import( '../views/materialUpload.vue')
  },
 
   {
    path: '/myMaterial',
    name: 'myMaterial',
    component: () => import( '../views/myMaterial.vue')
  },
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
  {
    path: '/workManagement',
    name: 'workManagement',
    component: workManagement
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: 'hash',
    base: process.env.BASE_URL,
})

export default router

