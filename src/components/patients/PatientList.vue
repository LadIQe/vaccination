<template>
  <div class="patients-wrapper">
    <div>Ockovani / zatial cakajuci obcania</div>

    <list
      :loading="isFetchingPatients"
      :data="patients"
    >
      <template #item="{ item }">
        <div class="item">
          <span>{{ `${item.first_name} ${item.last_name}` }}</span>
          <span><b>Centrum:</b> {{ item.vaccine_center?.vaccination_centre }}</span>

          <div class="action-btns">
            <button @click="$emit('editClick', item)">
              <img
                src="../../assets/edit.svg"
                height="20"
                width="20"
              >
            </button>

            <button @click="$emit('deleteClick', item)">
              <img
                src="../../assets/trash.svg"
                height="20"
                width="20"
              >
            </button>
          </div>
        </div>
      </template>
    </list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { PatientGetterTypes } from '@/store/modules/patient/StoreTypes'
import { PatientItem } from '@/types/PatientTypes'
import List from '../common/List.vue'

export default defineComponent({
  components: { List },
  emits: ['editClick', 'deleteClick'],
  setup () {
    const store = useStore()

    const patients = computed(() => store.getters[`patient/${PatientGetterTypes.GET_PATIENTS}`] as PatientItem[])
    const isFetchingPatients = computed(() => store.getters[`patient/${PatientGetterTypes.GET_IS_FETCHING_PATIENTS}`] as boolean)

    return {
      patients,
      isFetchingPatients
    }
  }
})
</script>

<style lang="scss" scoped>
.patients-wrapper {
  margin-top: 150px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    & > :first-child {
      width: 30%;
    }

    & > :nth-child(2) {
      flex-grow: 1;
    }

    .action-btns {
      display: flex;
      align-items: center;

      button {
        cursor: pointer;
        padding: 10px;
        border: none;
        background-color: transparent;
        border-radius: 5px;
        transition: background-color 0.25s ease-in-out;

        &:hover {
          background-color: lighten($color: lightgrey, $amount: 10%);
        }
      }

      & > button:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>
