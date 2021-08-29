import { PatientItem, RegisterPatient } from '../PatientTypes'
import { CentreItem, VaccineItem } from '../VaccineTypes'

export type RequestPatientData = {
  optionalData: Array<Exclude<keyof PatientItem, 'alergic' | 'first_name' | 'last_name' | 'id' | 'vaccine_centre'>>
  distinctOn: Array<keyof PatientItem>
}

export type RequestInsertPatientData = {
  object: RegisterPatient
  optionalData: Array<Exclude<keyof PatientItem, 'alergic' | 'first_name' | 'last_name' | 'id'>>
}

export type RequestUpdatePatientData = {
  updatedValues: Partial<RegisterPatient>
  optionalData: Array<Exclude<keyof PatientItem, 'alergic' | 'first_name' | 'last_name' | 'id'>>
}

export type RequestVaccineCentreData = {
  patientData: Array<keyof PatientItem>
  distinctOn: Array<Exclude<keyof CentreItem, 'patients' | 'patients_aggregate'>>
}

export type RequestVaccineData = {
  distinctOn: Array<keyof VaccineItem>
}
