import { PatientGetterTypes, PatientGetters } from './StoreTypes'

import type { GetterTree } from 'vuex'
import { PatientState } from './state'
import { RootState } from '../..'

const getters: GetterTree<PatientState, RootState> & PatientGetters = {
  [PatientGetterTypes.GET_IS_FETCHING_PATIENTS] (state) {
    return state.isFetchingPatients
  },

  [PatientGetterTypes.GET_IS_UPDATING_PATIENT] (state) {
    return state.isUpdatingPatient
  },

  [PatientGetterTypes.GET_IS_DELETING_PATIENT] (state) {
    return state.isDeletingPatient
  },

  [PatientGetterTypes.GET_PATIENTS] (state) {
    return state.patients
  }
}

export default getters
