<template>
  <div id="nav">
    <router-link :to="AllRoutesEnum.VACCINE_CENTER_LIST">
      Vakcinacne centra
    </router-link>
    <router-link :to="AllRoutesEnum.PATIENT_LIST">
      Zoznam pacientov
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AllRoutesEnum } from '@/router/Routes'

export default defineComponent({
  setup () {
    return {
      AllRoutesEnum
    }
  }
})
</script>

<style lang="scss">
#nav {
  padding: 10px 0;
  position: fixed;
  width: 100vw;
  border-bottom: 2px solid lightgrey;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 16px;
    padding: 15px 40px;
    display: inline-block;
    transition: 0.25s ease;

    &.router-link-exact-active {
      color: #42b983;
    }

    &:hover {
      background: lighten($color: lightgrey, $amount: 10%);
      border-radius: 5px;
    }
  }
}
</style>
