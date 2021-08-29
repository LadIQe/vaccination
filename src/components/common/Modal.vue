<template>
  <transition
    name="modal-fade"
    v-show="modelValue"
  >
    <div class="mask">
      <div class="modal">
        <div
          v-if="title"
          class="header"
        >
          <span>{{ title }}</span>
          <span
            class="close"
            @click="$emit('update:modelValue', false)"
          >X</span>
        </div>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
})
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .modal {
    background: white;
    margin: 500px auto 0 auto;

    .header {
      border-bottom: 1px solid lightgrey;
      padding: 20px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .close {
        margin-left: 20px;
        cursor: pointer;
      }
    }

    .modal-content {
      padding: 30px 20px 20px;
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .25s ease-in-out;
}
</style>
