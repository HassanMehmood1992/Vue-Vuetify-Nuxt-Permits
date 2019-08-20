<template>
  <v-container fluid class="mt-5 resetpw-page">
    <v-layout wrap class="mt-12 d-flex justify-center">
      <v-flex xs12 sm12 md7 class="mt-12">
        <span class="half-a-border-on-bottom primary-color">Reset Password</span>
      </v-flex>
      <v-flex
        xs12
        sm12
        md7
        class="mt-12 body-2 grey--text text--darken-1"
      >Please enter the OTP (One-Time-Password) that was sent to your email then reset your password.</v-flex>
      <v-flex xs12 sm12 md7 class="mt-5">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="OTP (One-Time-Password)"></v-text-field>
          <v-text-field label="New Password"></v-text-field>
          <v-text-field label="Confirm Password"></v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md7 class="mt-5">
        <div class="secondary-color caption">Passwords must contain:</div>
        <ul class="secondary-color caption">
          <li>At least 6 characters</li>
          <li>At least 1 upper case letter (A...Z)</li>
          <li>At least 1 lower case letter (a...z)</li>
          <li>At least 1 number (0...9)</li>
          <li>At least 1 special character</li>
        </ul>
      </v-flex>
      <v-flex xs12 sm12 md7 class="d-flex mt-5">
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-2 caption" min-width="100" to="/dashboard">Submit</v-btn>
        <v-btn outlined color="accent" class="caption" to="/login" min-width="100">Back To Login</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  layout: 'default',
  components: {},

  data: () => ({
    valid: false,
    rememberMe: false,
    showPassword: false
  }),

  computed: {
    activeLang() {
      return this.$store.state.app.activeLang
    }
  }
}
</script>
<style lang="scss"></style>
