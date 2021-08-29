<template>
  <h2>Tu najdete zoznam ludi registrovanych na ockovanie</h2>

  <patient-list
    @deleteClick="handleDelete"
    @editClick="handleEdit"
  />

  <update-patient-modal
    v-model="showEdit"
    :selected-patient="selectedPatient"
  />

  <delete-patient-modal
    v-model="showDelete"
    :selected-patient="selectedPatient"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, onServerPrefetch, ref } from 'vue'
import PatientList from '@/components/patients/PatientList.vue'
import { PatientItem } from '@/types/PatientTypes'
import DeletePatientModal from '@/components/patients/DeletePatientModal.vue'
import { useStore } from '@/store'
import { PatientActionTypes } from '@/store/modules/patient/StoreTypes'
import { RequestPatientData, RequestVaccineCentreData, RequestVaccineData } from '@/types/API/RequestTypes'
import { VaccineActionTypes } from '@/store/modules/vaccine/StoreTypes'
import UpdatePatientModal from '@/components/patients/UpdatePatientModal.vue'

const patientReq: RequestPatientData = {
  optionalData: ['vaccine_type', 'vaccination_centre'],
  distinctOn: []
}

const vaccineCentreReq: RequestVaccineCentreData = {
  patientData: ['id'],
  distinctOn: []
}

const vaccineReq: RequestVaccineData = {
  distinctOn: []
}

export default defineComponent({
  components: { PatientList, DeletePatientModal, UpdatePatientModal },
  setup () {
    const selectedPatient = ref<PatientItem | null>(null)
    const showEdit = ref(false)
    const showDelete = ref(false)

    const store = useStore()

    const handleEdit = (patient: PatientItem) => {
      showEdit.value = true
      selectedPatient.value = patient
    }
    const handleDelete = (patient: PatientItem) => {
      showDelete.value = true
      selectedPatient.value = patient
    }

    onServerPrefetch(async () => {
      await store.dispatch('vaccine/' + VaccineActionTypes.FETCH_VACCINE_CENTERS, { centres: vaccineCentreReq, vaccines: vaccineReq })
      await store.dispatch('patient/' + PatientActionTypes.FETCH_PATIENTS, patientReq)
    })

    onMounted(() => {
      store.dispatch('vaccine/' + VaccineActionTypes.FETCH_VACCINE_CENTERS, { centres: vaccineCentreReq, vaccines: vaccineReq })
      store.dispatch('patient/' + PatientActionTypes.FETCH_PATIENTS, patientReq)
    })

    return {
      selectedPatient,
      handleDelete,
      handleEdit,
      showEdit,
      showDelete
    }
  }
})
</script>
