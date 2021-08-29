import { AggregatePatients, PatientItem } from './PatientTypes'

export type CentreItem = {
  available_doctors: number
  id: number
  patients: Array<{
    [Property in keyof PatientItem]?: PatientItem[Property]
  }>
  patients_aggregate: AggregatePatients
  vaccination_centre: string
  vaccines_count: number
}

export type VaccineItem = {
  id: number
  vaccine_name: string
  vaccine_type: string
}
