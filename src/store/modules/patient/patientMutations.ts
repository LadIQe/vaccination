import type { MutationTree } from 'vuex'
import { PatientState } from './patientState'
import { PatientMutations, PatientMutationTypes } from './PatientStoreTypes'

const mutations: MutationTree<PatientState> & PatientMutations = {
  [PatientMutationTypes.SET_FETCHING_PATIENTS] (state, payload) {
    state.isFetchingPatients = payload
  },

  [PatientMutationTypes.FETCH_PATIENTS_SUCCESS] (state, payload) {
    state.data = payload
    state.isFetchingPatients = false
  },

  [PatientMutationTypes.FETCH_PATIENTS_FAILED] (state) {
    state.isFetchingPatients = false
    state.data = []
  }
}

export default mutations
