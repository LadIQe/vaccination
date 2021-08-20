
export type PatientState = {
  isFetchingPatients: boolean
  data: any
}

function state (): PatientState {
  return {
    isFetchingPatients: false,
    data: []
  }
}

export default state
