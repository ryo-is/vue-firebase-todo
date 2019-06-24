<template lang="pug">
  #app
    router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background-color: #2c3e50;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fcfcfc;
}
</style>

