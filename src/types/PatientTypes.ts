import { CentreItem } from './VaccineTypes'

export type PatientItem = {
  alergic: boolean
  created_at?: string | null
  first_name: string
  id: number
  last_name: string
  updated_at?: string | null
  vaccination_centre?: number | null
  vaccination_number?: number | null
  vaccine_center: (Pick<CentreItem, 'id' | 'vaccination_centre'> & Partial<Exclude<CentreItem, 'id' | 'vaccination_centre' >>) | null
  vaccine_type?: number | null
}

export type AggregatePatients = {
  aggregate: string
  nodes: PatientItem[]
}

export type RegisterPatient = {
  first_name: string
  last_name: string
  alergic: boolean
  vaccine_type: number
  vaccination_centre: number
}

export type UpdatePatient = Partial<RegisterPatient>
