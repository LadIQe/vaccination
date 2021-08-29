<template>
  <div class="centers-wrapper">
    <div>Vakcinacne centra</div>

    <list
      :loading="isFetchingCenters"
      :data="vaccineCenters"
    >
      <template #item="{ item }">
        <collapsible
          :label="item.vaccination_centre"
          action-label="Registrovat"
          @actionClick="$emit('selectedCentre', item)"
          :show-action="true"
        >
          <div class="list-content">
            <span>Pocet doktorov:</span>
            <span>{{ item.available_doctors }}</span>
          </div>

          <div class="list-content">
            <span>Pocet pacientov:</span>
            <span>{{ item.patients.length }}</span>
          </div>

          <div class="list-content">
            <span>Pocet vakcin:</span>
            <span>{{ item.vaccines_count }}</span>
          </div>
        </collapsible>
      </template>
    </list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { CentreItem } from '@/types/VaccineTypes'
import { VaccineGetterTypes } from '@/store/modules/vaccine/StoreTypes'
import Collapsible from '@/components/common/Collapsible.vue'
import List from '../common/List.vue'

export default defineComponent({
  components: { Collapsible, List },
  emits: ['selectedCentre'],
  setup () {
    const store = useStore()

    const vaccineCenters = computed(() => store.getters[`vaccine/${VaccineGetterTypes.GET_VACCINE_CENTERS}`] as CentreItem[])
    const isFetchingCenters = computed(() => store.getters[`vaccine/${VaccineGetterTypes.GET_IS_FETCHING_VACCINE_CENTERS}`] as boolean)

    return {
      vaccineCenters,
      isFetchingCenters
    }
  }
})
</script>

<style lang="scss" scoped>
.centers-wrapper {
  margin-top: 150px;

  .label {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;

    button {
      cursor: pointer;
      padding: 5px 15px;
      background: transparent;
      border: 1px solid lighten($color: lightgrey, $amount: 5%);
      transition: 0.25s ease;
      border-radius: 5px;

      &:hover {
        background: lighten($color: lightgrey, $amount: 15%);
      }
    }
  }

  .list-content {
    max-width: 200px;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;

    :first-child {
      font-weight: bold;
    }
  }
}
</style>
