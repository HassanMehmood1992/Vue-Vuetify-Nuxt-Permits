<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="accent accent-4"
      style="z-index:9"
      height="3"
    ></v-progress-linear>
    <v-content>
      <v-layout row class="default-layout">
        <v-flex xs12 sm12 md12>
          <div class="d-flex align-center pt-3 pl-10">
            <img
              src="https://eservices.gaca.gov.sa/GACA-resources/images/layout/logoFinal.png"
              alt
              width="150"
            />
            <img
              src="~/assets/images/permitpad_logo.png"
              class="logo ml-3"
              width="100"
              alt
              v-if="$route.name != 'login'"
            />
          </div>
          <nuxt />
        </v-flex>
      </v-layout>
    </v-content>

    <snackbar :snackbar="snackbar"></snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    snackbar: {
      show: false,
      text: null,
      color: null,
      timeout: 6000
    }
  }),

  computed: {
    loading() {
      return this.$store.state.app.loading
    }
  },

  created() {
    window.getApp = this
  }
}
</script>

<style lang="scss">
@import '@/assets/global.scss';
.default-layout {
  height: 100vh;
  overflow-y: hidden;
  // padding: 1rem 2rem;

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
