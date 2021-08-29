import { VaccineGetterTypes, VaccineGetters } from './StoreTypes'

import type { GetterTree } from 'vuex'
import { VaccineState } from './state'
import { RootState } from '../..'

const getters: GetterTree<VaccineState, RootState> & VaccineGetters = {
  [VaccineGetterTypes.GET_IS_FETCHING_VACCINE_CENTERS] (state) {
    return state.isFetchingVaccineCenters
  },

  [VaccineGetterTypes.GET_IS_CREATING_PATIENT_FOR_CENTRE] (state) {
    return state.isCreatingPatientForCentre
  },

  [VaccineGetterTypes.GET_VACCINE_CENTERS] (state) {
    return state.vaccineCenters
  },

  [VaccineGetterTypes.GET_VACCINES] (state) {
    return state.vaccines
  }
}

export default getters
