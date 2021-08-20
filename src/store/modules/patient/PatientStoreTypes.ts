import { PatientState } from './patientState'
import { Store as VuexStore } from 'vuex'
import type { CommitOptions, DispatchOptions } from 'vuex'
import { ActionContextModified } from '../ActionContextType'

/* ***************** Getters ***************** */
export enum PatientGetterTypes {
  GET_IS_FETCHING_PATIENTS = 'GET_IS_FETCHING_PATIENTS',
}

export type PatientGetters<S = PatientState> = {
  [PatientGetterTypes.GET_IS_FETCHING_PATIENTS] (state: S): boolean
}
/* ***************** Getters ***************** */
/*
 *
 *
 *
 */
/* ***************** Mutations ***************** */
export enum PatientMutationTypes {
  SET_FETCHING_PATIENTS = 'SET_FETCHING_PATIENTS',
  FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS',
  FETCH_PATIENTS_FAILED = 'FETCH_PATIENTS_FAILED',
}

export type PatientMutations<S = PatientState> = {
  [PatientMutationTypes.SET_FETCHING_PATIENTS] (state: S, payload: boolean): void
  [PatientMutationTypes.FETCH_PATIENTS_SUCCESS] (state: S, payload: any): void
  [PatientMutationTypes.FETCH_PATIENTS_FAILED] (state: S): void
}
/* ***************** Mutations ***************** */
/*
 *
 *
 *
 */
/* ***************** Actions ***************** */
export enum PatientActionTypes {
  FETCH_PATIENTS = 'FETCH_PATIENTS',
}

type PatientActionContext = {
  commit<K extends keyof PatientMutations>(
    key: K,
    payload: Parameters<PatientMutations[K]>[1]
  ): ReturnType<PatientMutations[K]>,
  getters: {
    [K in keyof PatientGetters]: ReturnType<PatientGetters[K]>
  }
} & Omit<ActionContextModified, 'commit' | 'getters'>

export type PatientActions = {
  [PatientActionTypes.FETCH_PATIENTS] (context: PatientActionContext, payload: any): void
}
/* ***************** Actions ***************** */
/*
 *
 *
 *
 */
/* ***************** Store type ***************** */
export type PatientStore<S = PatientState> = Omit<VuexStore<S>, 'commit' | 'dispatch' | 'getters'> & {
  commit<K extends keyof PatientMutations, P extends Parameters<PatientMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<PatientMutations[K]>
} & {
  dispatch<K extends keyof PatientActions>(
    key: K,
    payload: Parameters<PatientActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<PatientActions[K]>
} & {
  getters: {
    [K in keyof PatientGetters]: ReturnType<PatientGetters[K]>
  }
}
