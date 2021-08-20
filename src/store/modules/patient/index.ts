import state, { PatientState } from './patientState'
import getters from './patientGetters'
import mutations from './patientMutations'
import actions from './patientActions'
import type { Module } from 'vuex'
import { RootState } from '../..'

const cmsModule: Module<PatientState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default cmsModule
