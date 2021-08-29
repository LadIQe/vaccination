<template>
  <img
    src="../../assets/refresh.svg"
    :width="width"
    :height="height"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 15
    },
    height: {
      type: Number,
      default: 15
    }
  }
})
</script>

<style lang="scss" scoped>
img {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
