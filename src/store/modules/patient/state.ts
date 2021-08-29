import { PatientItem } from '@/types/PatientTypes'

export type PatientState = {
  isFetchingPatients: boolean
  isUpdatingPatient: boolean
  isDeletingPatient: boolean
  patients: PatientItem[]
}

function state (): PatientState {
  return {
    isFetchingPatients: false,
    isUpdatingPatient: false,
    isDeletingPatient: false,
    patients: []
  }
}

export default state
