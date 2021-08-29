import { VaccineMutationTypes, VaccineMutations } from './StoreTypes'

import type { MutationTree } from 'vuex'
import { VaccineState } from './state'

const mutations: MutationTree<VaccineState> & VaccineMutations = {
  [VaccineMutationTypes.SET_FETCHING_VACCINE_CENTERS] (state, payload) {
    state.isFetchingVaccineCenters = payload
  },

  [VaccineMutationTypes.SET_CREATING_PATIENT_FOR_CENTRE] (state, payload) {
    state.isCreatingPatientForCentre = payload
  },

  [VaccineMutationTypes.FETCH_VACCINE_CENTERS_SUCCESS] (state, payload) {
    state.vaccineCenters = payload
    state.isFetchingVaccineCenters = false
  },

  [VaccineMutationTypes.FETCH_VACCINE_CENTERS_FAILED] (state) {
    state.isFetchingVaccineCenters = false
    state.vaccineCenters = []
  },

  [VaccineMutationTypes.FETCH_VACCINES_SUCCESS] (state, payload) {
    state.vaccines = payload
  },

  [VaccineMutationTypes.FETCH_VACCINES_FAILED] (state) {
    state.vaccines = []
  },

  [VaccineMutationTypes.CREATE_PATIENT_FOR_CENTRE_SUCCESS] (state, { centreID, patientID }) {
    const centreIndex = state.vaccineCenters.findIndex(item => item.id === centreID)

    state.vaccineCenters[centreIndex].patients.push({ id: patientID })
    state.isCreatingPatientForCentre = false
  }
}

export default mutations
