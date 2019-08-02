<template lang="pug">
  v-app#app()
    v-content.main-content.overflow-y-auto
      router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./common/styles/config";

body {
  margin: 0;

  // スクロールバー非表示
  ::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  // &::-webkit-scrollbar-track {
  //   background-color: $scrollbar-track-color;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: rgba($scrollbar-thumb-color, .6);
  //   border-radius: 8px;
  // }
}

#app {
  font-family: 'Avenir','Helvetica Neue','Helvetica','Arial','Hiragino Sans','ヒラギノ角ゴシック',YuGothic,'Yu Gothic','メイリオ', Meiryo,'ＭＳ Ｐゴシック','MS PGothic';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $common-font-color;
}
</style>

