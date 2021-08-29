<template>
  <h2>Tu najdete potrebne info o dostupnych vakcinacnych centrach</h2>

  <centre-list @selectedCentre="handleSelectedCentre" />

  <register-patient-modal
    v-model="showRegister"
    :selected-centre="selectedCentre"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, onServerPrefetch, ref } from 'vue'
import { CentreItem } from '@/types/VaccineTypes'
import RegisterPatientModal from '@/components/vaccines/RegisterPatientModal.vue'
import CentreList from '@/components/vaccines/CentreList.vue'
import { useStore } from '@/store'
import { VaccineActionTypes } from '@/store/modules/vaccine/StoreTypes'
import { RequestVaccineCentreData, RequestVaccineData } from '@/types/API/RequestTypes'

const vaccineCentreReq: RequestVaccineCentreData = {
  patientData: ['id'],
  distinctOn: []
}

const vaccineReq: RequestVaccineData = {
  distinctOn: []
}

export default defineComponent({
  components: { RegisterPatientModal, CentreList },
  setup () {
    const showRegister = ref(false)
    const selectedCentre = ref<CentreItem | null>(null)

    const store = useStore()

    const handleSelectedCentre = (value: CentreItem) => {
      selectedCentre.value = value
      showRegister.value = true
    }

    onServerPrefetch(async () => {
      await store.dispatch(`vaccine/${VaccineActionTypes.FETCH_VACCINE_CENTERS}`, { centres: vaccineCentreReq, vaccines: vaccineReq })
    })

    onMounted(() => {
      store.dispatch(`vaccine/${VaccineActionTypes.FETCH_VACCINE_CENTERS}`, { centres: vaccineCentreReq, vaccines: vaccineReq })
    })

    return {
      showRegister,
      selectedCentre,
      handleSelectedCentre
    }
  }
})
</script>
