<template>
  <user-profile></user-profile>
</template>
<script>
import UserProfile from '~/components/UserProfile'
export default {
  layout: 'main',
  components: { UserProfile },
  data: () => ({
    title: 'My Profile'
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  }
}
</script>
<style lang="scss">
</style>