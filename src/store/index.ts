
import type { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as baseUseStore
} from 'vuex'
import patient from './modules/patient'
import vaccine from './modules/vaccine'
import { PatientState } from './modules/patient/state'
import { VaccineState } from './modules/vaccine/state'

export type RootState = {
  patient: PatientState,
  vaccine: VaccineState
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<RootState>> = Symbol('vuex-key')

export const store = createStore<RootState>({
  modules: {
    patient,
    vaccine
  },

  devtools: true,

  strict: process.env.NODE_ENV === 'development'
})

export function useStore () {
  return baseUseStore(storeKey)
}
