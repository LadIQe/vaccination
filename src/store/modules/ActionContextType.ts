import type { ActionContext } from 'vuex'
import { RootState } from '..'
import { PatientState } from './patient/state'
import { PatientGetters } from './patient/StoreTypes'
import { VaccineGetters } from './vaccine/StoreTypes'
import { VaccineState } from './vaccine/state'

type AllGetters = {
  [K in keyof PatientGetters as `patient/${K}`]: PatientGetters[K]
} & {
  [K in keyof VaccineGetters as `vaccine/${K}`]: VaccineGetters[K]}

type AllStates = PatientState | VaccineState

export interface ActionContextModified extends ActionContext<AllStates, RootState> {
  rootGetters: {
    [K in keyof AllGetters]: ReturnType<AllGetters[K]>
  }
}
