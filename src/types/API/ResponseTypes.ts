import { PatientItem } from '../PatientTypes'
import { CentreItem, VaccineItem } from '../VaccineTypes'

export type PatientsResponse = {
  data: {
    patient: PatientItem[]
  }
}

export type CreatePatientOneResponse = {
  data: {
    insert_patient_one: PatientItem
  }
}

export type UpdatePatientResponse = {
  data: {
    update_patient: {
      affected_rows: number
      returning?: PatientItem[]
    }
  }
}

export type DeletePatientResponse = {
  data: {
    delete_patient: {
      affected_rows: number
      returning?: PatientItem[]
    }
  }
}

export type VaccineCentersResponse = {
  data: {
    vaccine_centers: CentreItem[]
  }
}

export type VaccinesResponse = {
  data: {
    vaccines: VaccineItem[]
  }
}

export type Responses =
  | PatientsResponse
  | CreatePatientOneResponse
  | UpdatePatientResponse
  | DeletePatientResponse
  | VaccineCentersResponse
  | VaccinesResponse
