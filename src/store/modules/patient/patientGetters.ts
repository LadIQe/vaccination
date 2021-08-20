import type { GetterTree } from 'vuex'
import { RootState } from '../..'
import { PatientState } from './patientState'
import { PatientGetters, PatientGetterTypes } from './PatientStoreTypes'

const getters: GetterTree<PatientState, RootState> & PatientGetters = {
  [PatientGetterTypes.GET_IS_FETCHING_PATIENTS] (state) {
    return state.isFetchingPatients
  }
}

export default getters
