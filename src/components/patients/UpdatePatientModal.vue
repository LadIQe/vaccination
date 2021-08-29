<template>
  <modal
    v-model="open"
    :title="`Uprava profilu ${patient?.first_name || ''}`"
  >
    <form
      class="form"
      id="update-form"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="patient.first_name"
        name="first_name"
        placeholder="Meno"
      >
      <input
        v-model="patient.last_name"
        name="last_name"
        placeholder="Priezvisko"
      >
      <select
        v-model="patient.vaccine_type"
        name="vaccine_type"
      >
        <option
          :value="null"
          disabled
        >
          Typ vakciny
        </option>
        <option
          v-for="(vaccine, i) in vaccines"
          :key="i"
          :value="vaccine.id"
        >
          {{ vaccine.vaccine_name }}
        </option>
      </select>

      <div class="checkbox">
        <input
          v-model="patient.alergic"
          name="alergic"
          type="checkbox"
          id="alergic"
          :checked="patient.alergic"
        >
        <label for="alergic">Alergicky</label>
      </div>

      <select
        v-model="patient.vaccination_centre"
        name="vaccine_type"
      >
        <option
          :value="null"
          disabled
        >
          Vyberte centrum
        </option>
        <option
          v-for="(centre, i) in centres"
          :key="i"
          :value="centre.id"
        >
          {{ centre.vaccination_centre }}
        </option>
      </select>
    </form>

    <button
      type="submit"
      form="update-form"
    >
      <spinner v-show="isUpdatingPatient" />

      Uprav
    </button>
  </modal>
</template>

<script lang="ts">
import { PatientItem, UpdatePatient } from '@/types/PatientTypes'
import { computed, defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'

import { useStore } from '@/store'
import { PatientActionTypes, PatientGetterTypes } from '@/store/modules/patient/StoreTypes'
import Spinner from '../common/Spinner.vue'
import { VaccineGetterTypes } from '@/store/modules/vaccine/StoreTypes'
import { CentreItem, VaccineItem } from '@/types/VaccineTypes'
import { cleanObject } from '@/utils/ObjectUtils'

type Patient = {
  [K in keyof PatientItem]-?: PatientItem[K]
}

const BASE_PATIENT: Patient = {
  id: 0,
  first_name: '',
  last_name: '',
  alergic: false,
  created_at: '',
  updated_at: '',
  vaccination_centre: null,
  vaccination_number: null,
  vaccine_center: null,
  vaccine_type: null
}

export default defineComponent({
  components: { Spinner },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    selectedPatient: {
      type: Object as PropType<PatientItem | null>,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const selectedPatient = toRef(props, 'selectedPatient')
    const model = toRef(props, 'modelValue')

    const open = ref(false)
    const patient = ref<PatientItem>({ ...BASE_PATIENT })

    const store = useStore()

    const isUpdatingPatient = computed(() => store.getters[`patient/${PatientGetterTypes.GET_IS_UPDATING_PATIENT}`] as boolean)
    const vaccines = computed(() => store.getters[`vaccine/${VaccineGetterTypes.GET_VACCINES}`] as VaccineItem[])
    const centres = computed(() => store.getters[`vaccine/${VaccineGetterTypes.GET_VACCINE_CENTERS}`] as CentreItem[])

    const handleSubmit = () => {
      const updatedValues: UpdatePatient = {
        first_name: patient.value.first_name,
        last_name: patient.value.last_name,
        alergic: patient.value.alergic,
        vaccine_type: patient.value.vaccine_type as number | undefined,
        vaccination_centre: patient.value.vaccination_centre as number | undefined
      }

      store.dispatch(`patient/${PatientActionTypes.UPDATE_PATIENT}`, { patientID: patient.value.id, data: cleanObject(updatedValues) })
    }

    watch(model, (value) => {
      open.value = value
    })

    watch(selectedPatient, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        patient.value = { ...newVal }
      }
    })

    watch(open, (newVal, oldVal) => {
      if (!newVal && oldVal) {
        emit('update:modelValue', false)
      }
    })

    return {
      open,
      patient,
      vaccines,
      centres,
      isUpdatingPatient,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 650px;

  & > * {
    width: 300px;
    margin-bottom: 10px;
  }

  input,
  select {
    border: none;
    border-bottom: 1px solid lightgrey;
    padding: 10px 20px;
    transition: border-bottom 0.25s ease-in-out;

    &:focus-visible {
      outline: none;
      border-bottom: 1px solid darken($color: lightgrey, $amount: 20%);
    }
  }

  select {
    cursor: pointer;
  }

  .checkbox {
    display: flex;
    align-items: center;

    label {
      margin-left: 20px;
    }
  }
}

button {
  cursor: pointer;
  display: flex;
  margin-top: 30px;
  margin-left: auto;
  width: auto;
  padding: 10px 20px;
  border: none;
  background: #42b983;
  color: white;
  text-transform: uppercase;

  :first-child {
    margin-right: 10px;
  }
}
</style>
