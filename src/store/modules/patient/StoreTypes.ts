import type { CommitOptions, DispatchOptions } from 'vuex'

import { ActionContextModified } from '../ActionContextType'
import { PatientState } from './state'
import { RequestPatientData } from 'src/types/API/RequestTypes'
import { Store as VuexStore } from 'vuex'
import { PatientItem, UpdatePatient } from '@/types/PatientTypes'

/* ***************** Getters ***************** */
export enum PatientGetterTypes {
  GET_IS_FETCHING_PATIENTS = 'GET_IS_FETCHING_PATIENTS',
  GET_IS_UPDATING_PATIENT = 'GET_IS_UPDATING_PATIENT',
  GET_IS_DELETING_PATIENT = 'GET_IS_DELETING_PATIENT',
  GET_PATIENTS = 'GET_PATIENTS',
  GET_PATIENT_BY_ID = 'GET_PATIENT_BY_ID'
}

export type PatientGetters<S = PatientState> = {
  [PatientGetterTypes.GET_IS_FETCHING_PATIENTS] (state: S): boolean
  [PatientGetterTypes.GET_IS_UPDATING_PATIENT] (state: S): boolean
  [PatientGetterTypes.GET_IS_DELETING_PATIENT] (state: S): boolean
  [PatientGetterTypes.GET_PATIENTS] (state: S): PatientItem[]
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
  SET_UPDATING_PATIENT = 'SET_UPDATING_PATIENT',
  SET_DELETING_PATIENT = 'SET_DELETING_PATIENT',
  FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS',
  FETCH_PATIENTS_FAILED = 'FETCH_PATIENTS_FAILED',
  UPDATE_PATIENT_SUCCESS = 'UPDATE_PATIENT_SUCCESS',
  DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS'
}

export type PatientMutations<S = PatientState> = {
  [PatientMutationTypes.SET_FETCHING_PATIENTS] (state: S, payload: boolean): void
  [PatientMutationTypes.SET_UPDATING_PATIENT] (state: S, payload: boolean): void
  [PatientMutationTypes.SET_DELETING_PATIENT] (state: S, payload: boolean): void
  [PatientMutationTypes.FETCH_PATIENTS_SUCCESS] (state: S, payload: PatientItem[]): void
  [PatientMutationTypes.FETCH_PATIENTS_FAILED] (state: S): void
  [PatientMutationTypes.UPDATE_PATIENT_SUCCESS] (state: S, payload: { patientID: number, data: Partial<PatientItem> }): void
  [PatientMutationTypes.DELETE_PATIENT_SUCCESS] (state: S, payload: number): void
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
  UPDATE_PATIENT = 'UPDATE_PATIENT',
  DELETE_PATIENT = 'DELETE_PATIENT'
}

type PatientActionContext = {
  commit<K extends keyof PatientMutations>(
    key: K,
    payload: Parameters<PatientMutations[K]>[1],
  ): ReturnType<PatientMutations[K]>,
  getters: {
    [K in keyof PatientGetters]: ReturnType<PatientGetters[K]>
  }
} & Omit<ActionContextModified, 'commit' | 'getters'>

export type PatientActions = {
  [PatientActionTypes.FETCH_PATIENTS] (context: PatientActionContext, payload: RequestPatientData): void
  [PatientActionTypes.UPDATE_PATIENT] (context: PatientActionContext, payload: { patientID: number, data: UpdatePatient }): void
  [PatientActionTypes.DELETE_PATIENT] (context: PatientActionContext, payload: number): void
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
