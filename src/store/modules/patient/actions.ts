import { PatientActionTypes, PatientActions, PatientMutationTypes } from './StoreTypes'
import { createMutation, createQuery, patientRequest } from '@/utils/QueryUtils'

import type { ActionTree } from 'vuex'
import { PatientState } from './state'
import { RootState } from '../..'
import { postData } from '../services'
import {
  DeletePatientResponse,
  PatientsResponse,
  UpdatePatientResponse
} from '@/types/API/ResponseTypes'

const actions: ActionTree<PatientState, RootState> & PatientActions = {
  async [PatientActionTypes.FETCH_PATIENTS] ({ commit }, payload) {
    commit(PatientMutationTypes.SET_FETCHING_PATIENTS, true)

    try {
      const query = createQuery([patientRequest.getPatients(payload)])
      const response = await postData<PatientsResponse>(query)

      commit(PatientMutationTypes.FETCH_PATIENTS_SUCCESS, response.data.data.patient || [])
    } catch {
      commit(PatientMutationTypes.FETCH_PATIENTS_FAILED, undefined)
    }
  },

  async [PatientActionTypes.UPDATE_PATIENT] ({ commit }, { patientID, data }) {
    commit(PatientMutationTypes.SET_UPDATING_PATIENT, true)

    try {
      const mutation = createMutation([patientRequest.updatePatient(data, patientID)])

      await postData<UpdatePatientResponse>(mutation)

      commit(PatientMutationTypes.UPDATE_PATIENT_SUCCESS, { patientID, data })
    } catch {
      commit(PatientMutationTypes.SET_UPDATING_PATIENT, false)
    }
  },

  async [PatientActionTypes.DELETE_PATIENT] ({ commit }, payload) {
    commit(PatientMutationTypes.SET_DELETING_PATIENT, true)

    try {
      const mutation = createMutation([patientRequest.deletePatient(payload)])

      await postData<DeletePatientResponse>(mutation)

      commit(PatientMutationTypes.DELETE_PATIENT_SUCCESS, payload)
    } catch {
      commit(PatientMutationTypes.SET_DELETING_PATIENT, false)
    }
  }
}

export default actions
