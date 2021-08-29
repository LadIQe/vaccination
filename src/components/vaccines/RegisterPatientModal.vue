<template>
  <modal
    v-model="open"
    :title="`Registracia noveho obcana${selectedCentre ? ` - ${selectedCentre.vaccination_centre}` : ''}`"
  >
    <form
      class="form"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="registerPatient.first_name"
        name="first_name"
        placeholder="Meno"
        required
      >
      <input
        v-model="registerPatient.last_name"
        name="last_name"
        placeholder="Priezvisko"
        required
      >
      <select
        v-model="registerPatient.vaccine_type"
        name="vaccine_type"
        required
      >
        <option
          value=""
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
          v-model="registerPatient.alergic"
          name="alergic"
          type="checkbox"
          id="alergic"
          :checked="registerPatient.alergic"
        >
        <label for="alergic">Alergicky</label>
      </div>

      <button type="submit">
        <spinner v-show="isCreatingPatient" />

        Registruj
      </button>
    </form>
  </modal>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { VaccineActionTypes, VaccineGetterTypes } from '@/store/modules/vaccine/StoreTypes'
import { RegisterPatient } from '@/types/PatientTypes'
import { CentreItem, VaccineItem } from '@/types/VaccineTypes'
import { defineComponent, computed, ref, watch, toRef } from 'vue'
import type { PropType } from 'vue'
import { RequestInsertPatientData } from '@/types/API/RequestTypes'
import Spinner from '../common/Spinner.vue'

type BasePatient = {
  [K in keyof RegisterPatient]: RegisterPatient[K] | string
}

const BASE_REGISTER_PATIENT: BasePatient = {
  first_name: '',
  last_name: '',
  alergic: false,
  vaccine_type: '',
  vaccination_centre: ''
}

export default defineComponent({
  components: { Spinner },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    selectedCentre: {
      type: Object as PropType<CentreItem | null>,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const model = toRef(props, 'modelValue')
    const selectedCentre = toRef(props, 'selectedCentre')

    const open = ref(false)
    const registerPatient = ref({ ...BASE_REGISTER_PATIENT })

    const store = useStore()

    const vaccines = computed(() => store.getters[`vaccine/${VaccineGetterTypes.GET_VACCINES}`] as VaccineItem[])
    const isCreatingPatient = computed(() => store.getters[`vaccine/${VaccineGetterTypes.GET_IS_CREATING_PATIENT_FOR_CENTRE}`] as boolean)

    const handleSubmit = () => {
      const reqData: RequestInsertPatientData = {
        object: { ...(registerPatient.value as RegisterPatient), vaccination_centre: selectedCentre.value!.id },
        optionalData: []
      }

      store.dispatch(`vaccine/${VaccineActionTypes.CREATE_PATIENT_FOR_CENTRE}`, reqData)
    }

    const resetData = () => {
      emit('update:modelValue', false)

      setTimeout(() => {
        registerPatient.value = { ...BASE_REGISTER_PATIENT }
      }, 500)
    }

    watch(model, (value) => {
      open.value = value
    })

    watch(open, (value) => {
      if (!value) {
        resetData()
      }
    })

    watch(isCreatingPatient, (newVal, oldVal) => {
      if (!newVal && oldVal) {
        open.value = false

        resetData()
      }
    })

    return {
      open,
      registerPatient,
      vaccines,
      handleSubmit,
      isCreatingPatient
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

    * {
      cursor: pointer;
    }

    label {
      margin-left: 20px;
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
}
</style>
