<template>
  <v-container fluid class="terms-conditions">
    <v-layout>
      <v-flex xs12 sm8 md6 pl-5>
        <perfect-scrollbar>
          <img
            src="https://eservices.gaca.gov.sa/GACA-resources/images/Conditions.png"
            alt
            width="100%"
          />
        </perfect-scrollbar>
      </v-flex>
      <v-flex xs12 sm8 md6 class="default-layout-image d-flex flex-column align-end">
        <div class="mt-12">
          <img src="~/assets/images/pixelmap.png" alt />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  layout: 'default',
  data: () => ({
    title: 'Terms And Conditions'
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  methods: {}
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.register-page {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
