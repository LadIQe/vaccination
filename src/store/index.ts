
import type { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as baseUseStore
} from 'vuex'
import patient from './modules/patient'
import { PatientState } from './modules/patient/patientState'

export type RootState = {
  patient: PatientState
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<RootState>> = Symbol('vuex-key')

export const store = createStore<RootState>({
  modules: {
    patient
  },

  devtools: true,

  strict: process.env.NODE_ENV === 'development'
})

export function useStore () {
  return baseUseStore(storeKey)
}
