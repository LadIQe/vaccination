import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'
import { AllRoutesEnum } from './Routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: AllRoutesEnum.HOME,
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: AllRoutesEnum.VACCINE_CENTER_LIST,
    name: 'Vaccine centers',
    component: () => import(/* webpackChunkName: "vaccine" */ '../views/VaccineCenters.vue')
  },
  {
    path: AllRoutesEnum.PATIENT_LIST,
    name: 'Patients',
    component: () => import(/* webpackChunkName: "patients" */ '../views/Patients.vue')
  }
]

const history = typeof window === 'undefined' ? createMemoryHistory() : createWebHistory()

const router = createRouter({
  history,
  routes
})

export default router
