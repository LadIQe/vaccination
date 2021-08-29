<template>
  <div
    v-if="loading"
    class="spinner-wrapper"
  >
    <spinner
      :width="30"
      :height="30"
    />
  </div>

  <div
    v-if="!loading && data.length"
    class="list"
  >
    <div
      class="list-item"
      v-for="(item, i) in data"
      :key="i"
    >
      <slot
        name="item"
        :item="item"
      />
    </div>
  </div>

  <div
    v-if="!loading && !data.length"
    class="list-nothing-found"
  >
    <span>Nenasli sa ziadne zaznamy</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Spinner from '@/components/common/Spinner.vue'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  components: { Spinner }
})
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}

.list {
  .list-item:not(:first-child) {
    border-top: 1px solid lighten($color: lightgrey, $amount: 10%);
  }
}

.list-nothing-found {
  text-align: center;
  padding: 40px;
  font-weight: bold;
}
</style>
