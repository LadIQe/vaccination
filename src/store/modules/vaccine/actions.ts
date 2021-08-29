import { VaccineActionTypes, VaccineActions, VaccineMutationTypes } from './StoreTypes'
import { createMutation, createQuery, patientRequest, vaccineRequest } from '@/utils/QueryUtils'

import type { ActionTree } from 'vuex'
import { VaccineState } from './state'
import { RootState } from '../..'
import { postData } from '../services'
import type { CreatePatientOneResponse, VaccineCentersResponse, VaccinesResponse } from '@/types/API/ResponseTypes'

type CentersAndVaccinesResposne = {
  data: VaccineCentersResponse['data'] & VaccinesResponse['data']
}

const actions: ActionTree<VaccineState, RootState> & VaccineActions = {
  async [VaccineActionTypes.FETCH_VACCINE_CENTERS] ({ commit }, { vaccines, centres }) {
    commit(VaccineMutationTypes.SET_FETCHING_VACCINE_CENTERS, true)

    try {
      const query = createQuery([vaccineRequest.getCentres(centres), vaccineRequest.getVaccines(vaccines)])
      const response = await postData<CentersAndVaccinesResposne>(query)

      commit(VaccineMutationTypes.FETCH_VACCINE_CENTERS_SUCCESS, response.data.data.vaccine_centers || [])
      commit(VaccineMutationTypes.FETCH_VACCINES_SUCCESS, response.data.data.vaccines || [])
    } catch {
      commit(VaccineMutationTypes.FETCH_VACCINE_CENTERS_FAILED, undefined)
      commit(VaccineMutationTypes.FETCH_VACCINES_FAILED, undefined)
    }
  },

  async [VaccineActionTypes.CREATE_PATIENT_FOR_CENTRE] ({ commit }, payload) {
    commit(VaccineMutationTypes.SET_CREATING_PATIENT_FOR_CENTRE, true)

    try {
      const mutation = createMutation([patientRequest.createPatient(payload)])
      console.log(mutation)
      const response = await postData<CreatePatientOneResponse>(mutation)

      commit(
        VaccineMutationTypes.CREATE_PATIENT_FOR_CENTRE_SUCCESS,
        { centreID: payload.object.vaccination_centre as number, patientID: response.data.data.insert_patient_one.id }
      )
    } catch {
      commit(VaccineMutationTypes.SET_CREATING_PATIENT_FOR_CENTRE, false)
    }
  }
}

export default actions
