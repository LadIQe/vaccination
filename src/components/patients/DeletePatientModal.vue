<template>
  <modal
    v-model="open"
    :title="`Chystate sa zmazat obcana ${selectedPatient?.first_name || ''}`"
  >
    <p class="description">
      Prajete si pokracovat?
    </p>

    <div class="btns-wrapper">
      <button
        class="ok"
        @click="deletePatient()"
      >
        <spinner v-show="isDeletingPatient" />
        Zmazat
      </button>

      <button
        class="close"
        @click="open = !open"
      >
        Zrus
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { PatientItem } from '@/types/PatientTypes'
import { computed, defineComponent, ref, toRef, watch } from 'vue'
import type { PropType } from 'vue'
import { useStore } from '@/store'
import { PatientActionTypes, PatientGetterTypes } from '@/store/modules/patient/StoreTypes'
import Spinner from '../common/Spinner.vue'

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
    const model = toRef(props, 'modelValue')

    const open = ref(false)
    const selectedPatient = toRef(props, 'selectedPatient')

    const store = useStore()

    const isDeletingPatient = computed(() => store.getters[`patient/${PatientGetterTypes.GET_IS_DELETING_PATIENT}`] as boolean)

    const deletePatient = () => {
      store.dispatch(`patient/${PatientActionTypes.DELETE_PATIENT}`, selectedPatient.value?.id)
    }

    watch(model, (value) => {
      open.value = value
    })

    watch(open, (newVal, oldVal) => {
      if (!newVal && oldVal) {
        emit('update:modelValue', false)
      }
    })

    return {
      open,
      deletePatient,
      isDeletingPatient
    }
  }
})
</script>

<style lang="scss" scoped>
.description {
  margin-top: 0;
  margin-bottom: 40px;
}

.btns-wrapper {
  display: flex;
  justify-content: flex-end;

  & > button {
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    transition: 0.25s ease-in-out;
    border-radius: 5px;
  }

  .ok {
      background: red;
      color: white;
      margin-right: 20px;
      display: flex;
      align-items: center;

      img {
        margin-right: 15px;
      }
    }

  .close {
    background: transparent;

    &:hover {
      background: lighten($color: lightgrey, $amount: 10%);
    }
  }
}
</style>
