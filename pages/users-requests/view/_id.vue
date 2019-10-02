<template>
  <div>
    <user-profile
      :user="user"
      @onDelete="onDelete($event)"
      @onApprove="onApprove($event)"
      @onReject="onReject($event)"
    ></user-profile>
    <app-snackbar :snackbar="snackbar" @snackbarAction="snackbarAction($event)"></app-snackbar>
    <v-menu
      :close-on-content-click="false"
      :close-on-click="false"
      v-model="rejectCommentMenu"
      content-class="userrequests--rejectComment"
      activator=".userreject-btn"
      offset-y
      min-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-textarea label="User Rejection Comment" v-model="rejectionComment"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="caption"
            :disabled="!rejectionComment"
            @click="rejectConfirmation"
          >Reject</v-btn>
          <v-btn text class="caption" @click="rejectCommentMenu = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import UserProfile from '~/components/UserProfile'
export default {
  layout: 'main',
  components: { UserProfile },
  data: () => ({
    title: 'User Request Details',
    user: {},
    snackbar: {},
    selectedUser: {},
    actionType: '',
    rejectCommentMenu: false,
    rejectionComment: ''
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
          if (response && response.data.success) {
            this.user = response.data.result
          }
        })
    },

    onDelete(user) {
      this.selectedUser = user
      this.actionType = 'delete'
      this.snackbar = {
        show: true,
        text: `Are you sure you want to delete ${user.name}?`,
        timeout: 0,
        actions: ['Yes', 'No']
      }
    },

    deleteUser() {
      this.snackbar.show = false
      axios
        .post(
          `${process.env.adminUrl}accounts/user/${this.selectedUser.id}/delete`
        )
        .then(response => {
          if (response && response.data.success) {
            this.$router.push({ name: 'users-requests' })
            window.getApp.snackbar = {
              show: true,
              text: response.data.message
            }
          }
        })
    },

    onApprove(user) {
      this.selectedUser = user
      this.actionType = 'approve'
      this.snackbar = {
        show: true,
        text: `Are you sure you want to approve ${user.name}?`,
        timeout: 0,
        actions: ['Yes', 'No']
      }
    },

    approveUser() {
      this.snackbar.show = false
      axios
        .post(
          `${process.env.adminUrl}accounts/user/${this.selectedUser.id}/approved`
        )
        .then(response => {
          if (response && response.data.success) {
            this.$router.push({ name: 'users-requests' })
            window.getApp.snackbar = {
              show: true,
              text: response.data.message
            }
          }
        })
    },

    onReject(user) {
      this.selectedUser = user
      this.rejectCommentMenu = true
    },

    rejectConfirmation() {
      this.actionType = 'reject'
      this.snackbar = {
        show: true,
        text: `Are you sure you want to reject ${this.selectedUser.name}?`,
        timeout: 0,
        actions: ['Yes', 'No']
      }
    },

    rejectUser() {
      this.rejectCommentMenu = false
      this.snackbar.show = false
      axios
        .post(
          `${process.env.adminUrl}accounts/user/rejected?id=${this.selectedUser.id}&rejectionComment=${this.rejectionComment}`
        )
        .then(response => {
          if (response.data.success) {
            this.$router.push({ name: 'users-requests' })
            window.getApp.snackbar = {
              show: true,
              text: response.data.message
            }
          }
        })
    },

    snackbarAction(action) {
      switch (this.actionType) {
        case 'delete':
          switch (action) {
            case 'Yes':
              this.deleteUser()
              break
            case 'No':
              this.snackbar.show = false
              break
          }
          break
        case 'approve':
          switch (action) {
            case 'Yes':
              this.approveUser()
              break
            case 'No':
              this.snackbar.show = false
              break
          }
          break
        case 'reject':
          switch (action) {
            case 'Yes':
              this.rejectUser()
              break
            case 'No':
              this.snackbar.show = false
              this.rejectCommentMenu = false
              this.rejectionComment = ''
              break
          }
          break
      }
    }
  }
}
</script>
<style lang="scss">
</style>