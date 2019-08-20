<template>
  <v-app>
    <v-layout row class="default-layout">
      <v-flex xs12 sm8 md6>
        <img src="/permitpad_logo.png" class="logo" width="100" alt v-if="$route.name != 'login'" />
        <nuxt />
      </v-flex>
      <v-flex xs12 sm8 md6 class="default-layout-image d-flex flex-column align-end">
        <div class="mt-12">
          <img src="/pixelmap.png" alt />
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/assets/global.scss';
.default-layout {
  height: 100vh;
  overflow-y: hidden;
  padding: 1rem 2rem;

  &-image {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
