import { PatientMutationTypes, PatientMutations } from './StoreTypes'

import type { MutationTree } from 'vuex'
import { PatientState } from './state'

const mutations: MutationTree<PatientState> & PatientMutations = {
  [PatientMutationTypes.SET_FETCHING_PATIENTS] (state, payload) {
    state.isFetchingPatients = payload
  },

  [PatientMutationTypes.SET_UPDATING_PATIENT] (state, payload) {
    state.isUpdatingPatient = payload
  },

  [PatientMutationTypes.SET_DELETING_PATIENT] (state, payload) {
    state.isDeletingPatient = payload
  },

  [PatientMutationTypes.FETCH_PATIENTS_SUCCESS] (state, payload) {
    state.patients = payload
    state.isFetchingPatients = false
  },

  [PatientMutationTypes.FETCH_PATIENTS_FAILED] (state) {
    state.isFetchingPatients = false
    state.patients = []
  },

  [PatientMutationTypes.UPDATE_PATIENT_SUCCESS] (state, payload) {
    const patientIndex = state.patients.findIndex(patient => patient.id === payload.patientID)

    state.patients[patientIndex] = { ...state.patients[patientIndex], ...payload.data }
    state.isUpdatingPatient = false
  },

  [PatientMutationTypes.DELETE_PATIENT_SUCCESS] (state, payload) {
    state.isDeletingPatient = false
    state.patients = state.patients.filter(patient => patient.id !== payload)
  }
}

export default mutations
