import type { ActionContext } from 'vuex'
import { RootState } from '..'
import { PatientState } from './patient/patientState'
import { PatientGetters } from './patient/PatientStoreTypes'

type AllGetters = {
  [K in keyof PatientGetters as `patient/${K}`]: PatientGetters[K]
}

type AllStates = PatientState

export interface ActionContextModified extends ActionContext<AllStates, RootState> {
  rootGetters: {
    [K in keyof AllGetters]: ReturnType<AllGetters[K]>
  }
}
