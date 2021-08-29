import { CentreItem, VaccineItem } from '@/types/VaccineTypes'

export type VaccineState = {
  isFetchingVaccineCenters: boolean
  isCreatingPatientForCentre: boolean
  vaccineCenters: CentreItem[]
  vaccines: VaccineItem[]
}

function state (): VaccineState {
  return {
    isFetchingVaccineCenters: false,
    isCreatingPatientForCentre: false,
    vaccineCenters: [],
    vaccines: []
  }
}

export default state
