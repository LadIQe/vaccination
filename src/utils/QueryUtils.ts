import type { RequestInsertPatientData, RequestPatientData, RequestVaccineCentreData, RequestVaccineData } from '@/types/API/RequestTypes'
import { UpdatePatient } from '@/types/PatientTypes'
import { fromObjectToMultilineString } from './ObjectUtils'

export const patientRequest = {
  getPatients: (data: RequestPatientData) =>
    `patient(distinct_on: [${data.distinctOn.join('\n')}]) {
      id
      first_name
      last_name
      alergic
      vaccine_center {
        id
        vaccination_centre
      }
      ${data.optionalData.join('\n')}
    }`,

  createPatient: (data: RequestInsertPatientData) =>
    `insert_patient_one(
      object: {
        ${fromObjectToMultilineString(data.object)}
      }
    ) {
      id
      first_name
      last_name
      alergic
      ${data.optionalData.join('\n')}
    }`,

  updatePatient: (data: UpdatePatient, id: number) =>
    `update_patient(
      _set: {
        ${fromObjectToMultilineString(data)}
      },
      where: {
        id: {
          _eq: ${id}
        }
      }
    ) {
      affected_rows
    }`,

  deletePatient: (id: number) =>
    `delete_patient(where: {
      id: {
        _eq: ${id}
      }
    }) {
      affected_rows
    }`
}

export const vaccineRequest = {
  getCentres: (data: RequestVaccineCentreData) =>
    `vaccine_centers(distinct_on: [${data.distinctOn.join('\n')}]) {
      available_doctors
      id
      ${data.patientData.length
    ? `
      patients {
        ${data.patientData.join('\n')}
      }
      `
    : ''}
      vaccination_centre
      vaccines_count
    }`,

  getVaccines: (data: RequestVaccineData) =>
    `vaccines(distinct_on: [${data.distinctOn.join('\n')}]) {
      id
      vaccine_name
      vaccine_type
    }`
}

export const createQuery = (queries: string[]) => ({
  query: `
    query {
      ${queries.join('\n')}
    }
  `
})

export const createMutation = (mutations: string[]) => ({
  query: `
    mutation {
      ${mutations.join('\n')}
    }
  `
})
