import state, { VaccineState } from './state'

import type { Module } from 'vuex'
import { RootState } from '../..'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const cmsModule: Module<VaccineState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default cmsModule
