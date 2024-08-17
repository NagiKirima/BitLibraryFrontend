<template>
  <div>
    <header class="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div class="logo">
        <img src="/public/vite.svg">
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
  }
});
</script>

<style lang="scss">
.logo{
  width: 32px;
  height: 32px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
