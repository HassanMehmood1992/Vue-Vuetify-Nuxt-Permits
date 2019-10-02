<template>
  <div>
    <user-profile :user="user" @onDelete="onDelete($event)"></user-profile>
    <app-snackbar :snackbar="snackbar" @snackbarAction="snackbarAction($event)"></app-snackbar>
  </div>
</template>
<script>
import UserProfile from '~/components/UserProfile'
export default {
  layout: 'main',
  components: { UserProfile },
  data: () => ({
    title: 'User Profile',
    user: {},
    loading: false,
    snackbar: {},
    selectedUser: {}
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  mounted() {
    this.$store.dispatch('app/setAppTitle', this.title)
    this.getUserDetails()
  },

  methods: {
    getUserDetails() {
      axios
        .get(`${process.env.adminUrl}accounts/user/${this.$route.params.id}`)
        .then(response => {
          if (response && response.data.success)
            this.user = response.data.result
        })
    },

    onDelete(user) {
      this.selectedUser = user
      this.snackbar = {
        show: true,
        text: `Are you sure you want to delete ${user.name}?`,
        timeout: 0,
        actions: ['Yes', 'No']
      }
    },

    deleteUser() {
      this.loading = true
      this.snackbar.show = false
      axios
        .post(
          `${process.env.adminUrl}accounts/user/${this.selectedUser.id}/delete`
        )
        .then(response => {
          if (response && response.data.success) {
            this.$router.push({ name: 'users' })
            window.getApp.snackbar = {
              show: true,
              text: response.data.message
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    snackbarAction(action) {
      switch (action) {
        case 'Yes':
          this.deleteUser()
          break
        case 'No':
          this.snackbar.show = false
          break
      }
    }
  }
}
</script>
<style lang="scss">
</style>