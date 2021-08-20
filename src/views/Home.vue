<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onServerPrefetch } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { useStore } from '@/store'
import { PatientActionTypes } from '@/store/modules/patient/PatientStoreTypes'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const store = useStore()

    onServerPrefetch(async () => {
      // await store.dispatch(PatientActionTypes.FETCH_PATIENTS)
    })

    onMounted(() => {
      const query = {
        query: `
          query {
            patient(distinct_on: []) {
              alergic
              created_at
              first_name
              id
              last_name
              updated_at
              vaccination_centre
              vaccination_number
            }
          }`
      }
      store.dispatch(PatientActionTypes.FETCH_PATIENTS, query)
    })
  }
})
</script>
