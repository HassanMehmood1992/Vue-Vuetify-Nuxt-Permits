<template>
  <v-app>
    <v-layout row class="default-layout">
      <v-flex xs12 sm8 md6>
        <img
          src="~/assets/images/permitpad_logo.png"
          class="logo"
          width="100"
          alt
          v-if="$route.name != 'login'"
        />
        <nuxt />
      </v-flex>
      <v-flex xs12 sm8 md6 class="default-layout-image d-flex flex-column align-end">
        <div class="mt-12">
          <img src="~/assets/images/pixelmap.png" alt />
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    loading() {
      return this.$store.state.app.loading
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    getCategories() {
      this.$axios.$get(`Common/GetListByType?type=All`).then(response => {
        if (response.success) {
          this.$store.dispatch(
            'category/setRequestStatuses',
            _.filter(response.result, { type: 'Status' })
          )
          this.$store.dispatch(
            'category/setFlightTypes',
            _.filter(response.result, { type: 'FlightType' })
          )
          this.$store.dispatch(
            'category/setPermitTypes',
            _.filter(response.result, { type: 'PermitType' })
          )
          this.$store.dispatch(
            'category/setPurposeOfLanding',
            _.filter(response.result, { type: 'PurposeOfLanding' })
          )
          this.$store.dispatch(
            'category/setActions',
            _.filter(response.result, { type: 'Actions' })
          )
          this.$store.dispatch(
            'category/setClearanceTypes',
            _.filter(response.result, { type: 'ClearanceType' })
          )
          this.$store.dispatch(
            'category/setUserTypes',
            _.filter(response.result, { type: 'UserType' })
          )
        } else {
        }
      })
    }
  }
}
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
