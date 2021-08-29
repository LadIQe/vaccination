<template>
  <div
    :class="['collapsible', { 'open': open }]"
    @click="handleOpen"
  >
    <div class="label">
      <div class="title">
        <span name="label">{{ label }}</span>

        <button
          v-if="showAction"
          @click.stop="$emit('actionClick')"
        >
          {{ actionLabel }}
        </button>
      </div>
    </div>
    <div class="content">
      <div class="inner-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    actionLabel: {
      type: String,
      default: 'Akcia'
    },
    showAction: {
      type: Boolean,
      default: false
    }
  },
  emits: ['actionClick'],
  setup () {
    const open = ref(false)

    const handleOpen = () => {
      open.value = !open.value
    }

    return {
      open,
      handleOpen
    }
  }
})
</script>

<style lang="scss" scoped>
.collapsible {
  padding: 5px;

  * {
    cursor: pointer;
  }

  .label {
    display: flex;
    padding: 10px 0;
    font-size: 20px;
    font-weight: bold;
    width: 100%;

      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;

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
  }

  .label:before {
    content: '';
    display: inline-flex;
    height: 0;
    align-self: center;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid black;
    margin-right: 15px;
    transform: translateY(-2px);
    transition: transform .25s ease-out;
  }

  .content {
    padding: 0 20px;
    max-height: 0;
    overflow: hidden;

    transition: max-height .25s ease-in-out;
  }
}

.open {
  .label:before {
    transform: rotate(90deg) translateX(-3px);
  }

  .content {
    max-height: 100vh;
  }
}
</style>
