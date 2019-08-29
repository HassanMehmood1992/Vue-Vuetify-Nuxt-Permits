<template>
  <v-container fluid class="mt-12 login-page">
    <v-layout wrap class="mt-12 d-flex justify-center">
      <v-flex xs12 sm12 md7 class="mb-10 d-flex justify-center">
        <img src="~/assets/images/permitpad_logo.png" class="logo" width="200" alt />
      </v-flex>
      <v-flex xs12 sm12 md7 class="mt-12">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Email Address" v-model="model.emailAddress"></v-text-field>
          <v-text-field
            label="Password"
            v-model="model.password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md7>
        <div class="d-flex justify-space-between align-center">
          <v-checkbox v-model="model.rememberMe" color="primary">
            <template v-slot:label>
              <div class="caption primary-color">Remember Me</div>
            </template>
          </v-checkbox>
          <v-btn
            text
            x-small
            class="caption text-capitalize"
            color="primary"
            to="/forgot-password"
          >Forgot Password</v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md7 class="d-flex mt-5">
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-2 caption" min-width="100" @click="onLogin">Login</v-btn>
        <v-btn outlined color="accent" class="caption" to="/register" min-width="100">Register</v-btn>
      </v-flex>
    </v-layout>

    <app-snackbar :snackbar="snackbar" @snackbarAction="onSnackbarAction($event)"></app-snackbar>
  </v-container>
</template>

<script>
import user from '~/testData'
import cryptojs from 'crypto-js'
import qs from 'qs'

export default {
  layout: 'default',
  components: {},

  data: () => ({
    valid: false,
    showPassword: false,
    model: {
      emailAddress: '',
      password: '',
      rememberMe: false
    },
    user: user,
    snackbar: {
      show: false,
      timeout: 6000,
      text: 'Incorrect email address or password',
      actions: ['Close']
    }
  }),

  methods: {
    onLogin() {
      this.$store.dispatch('auth/getToken', {
        username: this.model.emailAddress,
        password: this.model.password
      })
      // if (
      //   this.model.emailAddress == this.user.emailAddress &&
      //   this.model.password == this.user.password
      // )
      //   this.$router.push({ name: 'dashboard' })
      // else {
      //   this.snackbar.show = true
      // }
    },

    onSnackbarAction(action) {
      this.snackbar.show = false
    }
  }
}
</script>
<style lang="scss"></style>
