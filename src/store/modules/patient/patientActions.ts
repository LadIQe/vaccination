
import type { ActionTree } from 'vuex'
import { RootState } from '../..'
import { fetchPatients } from './patientServices'
import { PatientState } from './patientState'
import { PatientActions, PatientActionTypes, PatientMutationTypes } from './PatientStoreTypes'

const actions: ActionTree<PatientState, RootState> & PatientActions = {
  async [PatientActionTypes.FETCH_PATIENTS] ({ commit }, payload) {
    commit(PatientMutationTypes.SET_FETCHING_PATIENTS, true)

    try {
      const response = await fetchPatients(payload)

      commit(PatientMutationTypes.FETCH_PATIENTS_SUCCESS, response.data || [])
    } catch {
      commit(PatientMutationTypes.FETCH_PATIENTS_FAILED, undefined)
    }
  }
}

export default actions
