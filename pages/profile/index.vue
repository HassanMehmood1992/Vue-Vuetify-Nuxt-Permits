<template>
  <user-profile :user="user"></user-profile>
</template>
<script>
import UserProfile from '~/components/UserProfile'
export default {
  layout: 'main',
  components: { UserProfile },
  data: () => ({
    title: 'My Profile'
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  }
}
</script>
<style lang="scss">
</style>