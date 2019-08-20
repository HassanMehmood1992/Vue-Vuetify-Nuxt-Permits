<template>
  <v-container fluid class="mt-12 forgotpw-page">
    <v-layout wrap class="mt-12 d-flex justify-center">
      <v-flex xs12 sm12 md7 class="mt-12">
        <span class="half-a-border-on-bottom primary-color">Forgot Password</span>
      </v-flex>
      <v-flex
        xs12
        sm12
        md7
        class="mt-12 body-2 grey--text text--darken-1"
      >An OTP (One-Time-Password) will be sent to this email address.</v-flex>
      <v-flex xs12 sm12 md7 class="mt-5">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Email Address"></v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md7 class="d-flex mt-5">
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-2 caption" min-width="100" to="/reset-password">Submit</v-btn>
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
