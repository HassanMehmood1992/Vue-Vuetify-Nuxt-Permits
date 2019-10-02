<template>
  <v-container fluid class="forgotpw-page">
    <v-layout wrap>
      <v-flex xs12 sm12 md6>
        <v-layout wrap class="mt-5 d-flex justify-center">
          <v-flex xs12 sm12 md8 class="mt-12">
            <span class="full-border-bottom primary-color">Forgot Password</span>
          </v-flex>
          <v-flex
            xs12
            sm12
            md8
            class="mt-12 body-2 grey--text text--darken-1"
          >An OTP (One-Time-Password) will be sent to this email address.</v-flex>
          <v-flex xs12 sm12 md8 class="mt-5">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Email Address"
                v-model="emailAddress"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
            </v-form>
          </v-flex>
          <v-flex xs12 sm12 md7 class="d-flex mt-5">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mr-2 caption"
              min-width="100"
              :disabled="loading"
              @click="forgotPassword"
            >Submit</v-btn>
            <v-btn outlined color="accent" class="caption" to="/login" min-width="100">Back To Login</v-btn>
          </v-flex>
        </v-layout>
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
    valid: false,
    title: 'Forgot Password',
    emailAddress: ''
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  computed: {
    rules() {
      return this.$store.state.app.inputRules
    },

    loading() {
      return this.$store.state.app.loading
    }
  },

  methods: {
    forgotPassword() {
      if (this.$refs.form.validate()) {
        axios
          .post('accounts/user/forgotPassword', {
            emailAddress: this.emailAddress
          })
          .then(response => {
            if (response && response.data.success) {
              localStorage.setItem('emailAddress', this.emailAddress)
              this.$router.push({ path: '/reset-password' })
            } else {
              window.getApp.snackbar = {
                show: true,
                text: response.data.result.identityResult.errors[0]
              }
            }
          })
      }
    }
  }
}
</script>
<style lang="scss"></style>
