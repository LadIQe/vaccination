<template>
  <div class="nav-wrapper">
    <the-navigation />
  </div>

  <div class="router-wrapper">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheNavigation from './components/navigation/TheNavigation.vue'

export default defineComponent({
  components: { TheNavigation }
})
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

body {
  min-height: 100%;

  * {
    box-sizing: border-box;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

  .nav-wrapper {
    position: fixed;
  }

  .router-wrapper {
    padding-top: 100px;
    margin: 0 auto;
    max-width: 1200px;
    text-align: left;
  }
}

@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
</style>
