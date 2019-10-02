<template>
  <v-layout wrap class="white-background pa-5">
    <v-flex xs12 sm12 md4>
      <v-text-field
        placeholder="Search"
        hide-details
        prepend-inner-icon="mdi-magnify"
        @keydown="searchUser"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 md12>
      <users-table :userList="users" :loading="loading" @onDelete="onDelete($event)"></users-table>
    </v-flex>

    <app-snackbar :snackbar="snackbar" @snackbarAction="snackbarAction($event)"></app-snackbar>
  </v-layout>
</template>

<script>
import UsersTable from '~/components/UsersTable'

export default {
  layout: 'main',
  components: { UsersTable },
  data: () => ({
    title: 'Users',
    users: [],
    unfilteredUsers: [],
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
    this.getUsers()
  },

  methods: {
    getUsers() {
      this.loading = true
      axios(`${process.env.adminUrl}accounts/user/all`)
        .then(response => {
          if (response && response.data.success) {
            this.users = response.data.result
            this.unfilteredUsers = response.data.result
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    searchUser(e) {
      if (e.target.value) {
        this.users = this.users.filter(
          user =>
            user.fullName.includes(e.target.value) ||
            user.email.includes(e.target.value)
        )
      } else this.users = this.unfilteredUsers
    },

    onDelete(user) {
      this.selectedUser = user
      this.snackbar = {
        show: true,
        text: `Are you sure you want to delete ${user.fullName}?`,
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
            this.users = this.users.filter(
              user => user.id != this.selectedUser.id
            )

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
