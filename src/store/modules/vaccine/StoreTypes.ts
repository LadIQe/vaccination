import type { CommitOptions, DispatchOptions } from 'vuex'

import { ActionContextModified } from '../ActionContextType'
import { VaccineState } from './state'
import { RequestInsertPatientData, RequestVaccineCentreData, RequestVaccineData } from 'src/types/API/RequestTypes'
import { Store as VuexStore } from 'vuex'
import { CentreItem, VaccineItem } from '@/types/VaccineTypes'

/* ***************** Getters ***************** */
export enum VaccineGetterTypes {
  GET_IS_FETCHING_VACCINE_CENTERS = 'GET_IS_FETCHING_VACCINE_CENTERS',
  GET_IS_CREATING_PATIENT_FOR_CENTRE = 'GET_IS_CREATING_PATIENT_FOR_CENTRE',
  GET_VACCINE_CENTERS = 'GET_VACCINE_CENTERS',
  GET_VACCINES = 'GET_VACCINES'
}

export type VaccineGetters<S = VaccineState> = {
  [VaccineGetterTypes.GET_IS_FETCHING_VACCINE_CENTERS] (state: S): boolean
  [VaccineGetterTypes.GET_IS_CREATING_PATIENT_FOR_CENTRE] (state: S): boolean
  [VaccineGetterTypes.GET_VACCINE_CENTERS] (state: S): CentreItem[]
  [VaccineGetterTypes.GET_VACCINES] (state: S): VaccineItem[]
}
/* ***************** Getters ***************** */
/*
 *
 *
 *
 */
/* ***************** Mutations ***************** */
export enum VaccineMutationTypes {
  SET_FETCHING_VACCINE_CENTERS = 'SET_FETCHING_VACCINE_CENTERS',
  SET_CREATING_PATIENT_FOR_CENTRE = 'SET_CREATING_PATIENT_FOR_CENTRE',
  FETCH_VACCINE_CENTERS_SUCCESS = 'FETCH_VACCINE_CENTERS_SUCCESS',
  FETCH_VACCINE_CENTERS_FAILED = 'FETCH_VACCINE_CENTERS_FAILED',
  FETCH_VACCINES_SUCCESS = 'FETCH_VACCINES_SUCCESS',
  FETCH_VACCINES_FAILED = 'FETCH_VACCINES_FAILED',
  CREATE_PATIENT_FOR_CENTRE_SUCCESS = 'CREATE_PATIENT_FOR_CENTRE_SUCCESS'
}

export type VaccineMutations<S = VaccineState> = {
  [VaccineMutationTypes.SET_FETCHING_VACCINE_CENTERS] (state: S, payload: boolean): void
  [VaccineMutationTypes.SET_CREATING_PATIENT_FOR_CENTRE] (state: S, payload: boolean): void
  [VaccineMutationTypes.FETCH_VACCINE_CENTERS_SUCCESS] (state: S, payload: CentreItem[]): void
  [VaccineMutationTypes.FETCH_VACCINE_CENTERS_FAILED] (state: S): void
  [VaccineMutationTypes.FETCH_VACCINES_SUCCESS] (state: S, payload: VaccineItem[]): void
  [VaccineMutationTypes.FETCH_VACCINES_FAILED] (state: S): void
  [VaccineMutationTypes.CREATE_PATIENT_FOR_CENTRE_SUCCESS] (state: S, payload: { centreID: number, patientID: number}): void
}
/* ***************** Mutations ***************** */
/*
 *
 *
 *
 */
/* ***************** Actions ***************** */
export enum VaccineActionTypes {
  FETCH_VACCINE_CENTERS = 'FETCH_VACCINE_CENTERS',
  CREATE_PATIENT_FOR_CENTRE = 'CREATE_PATIENT_FOR_CENTRE'
}

type VaccineActionContext = {
  commit<K extends keyof VaccineMutations>(
    key: K,
    payload: Parameters<VaccineMutations[K]>[1]
  ): ReturnType<VaccineMutations[K]>,
  getters: {
    [K in keyof VaccineGetters]: ReturnType<VaccineGetters[K]>
  }
} & Omit<ActionContextModified, 'commit' | 'getters'>

export type VaccineActions = {
  [VaccineActionTypes.FETCH_VACCINE_CENTERS] (
    context: VaccineActionContext,
    payload: {
      centres: RequestVaccineCentreData,
      vaccines: RequestVaccineData
    }
  ): void
  [VaccineActionTypes.CREATE_PATIENT_FOR_CENTRE] (context: VaccineActionContext, payload: RequestInsertPatientData): void
}
/* ***************** Actions ***************** */
/*
 *
 *
 *
 */
/* ***************** Store type ***************** */
export type VaccineStore<S = VaccineState> = Omit<VuexStore<S>, 'commit' | 'dispatch' | 'getters'> & {
  commit<K extends keyof VaccineMutations, P extends Parameters<VaccineMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<VaccineMutations[K]>
} & {
  dispatch<K extends keyof VaccineActions>(
    key: K,
    payload: Parameters<VaccineActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<VaccineActions[K]>
} & {
  getters: {
    [K in keyof VaccineGetters]: ReturnType<VaccineGetters[K]>
  }
}
