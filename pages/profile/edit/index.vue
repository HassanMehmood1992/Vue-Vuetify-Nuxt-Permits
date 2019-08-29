<template>
  <user-form></user-form>
</template>

<script>
import UserForm from '@/components/UserForm'

export default {
  layout: 'main',
  components: { UserForm },
  data: () => ({
    title: 'Edit Profile'
  }),

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
  }
}
</script>
<style lang="scss"></style>