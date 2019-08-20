<template>
  <v-container fluid class="mt-12 login-page">
    <v-layout wrap class="mt-12 d-flex justify-center">
      <v-flex xs12 sm12 md7 class="mb-10 d-flex justify-center">
        <img src="/permitpad_logo.png" class="logo" width="200" alt />
      </v-flex>
      <v-flex xs12 sm12 md7 class="mt-12">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Email Address"></v-text-field>
          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="activeLang == 'en' ? showPassword ? 'mdi-eye' : 'mdi-eye-off' : ''"
            :prepend-inner-icon="activeLang == 'ar' ? showPassword ? 'mdi-eye' : 'mdi-eye-off' : ''"
            @click:append="showPassword = !showPassword"
            @click:prepend-inner="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md7>
        <div class="d-flex justify-space-between align-center">
          <v-checkbox v-model="rememberMe" color="primary">
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
        <v-btn color="primary" class="mr-2 caption" min-width="100" to="/dashboard">Login</v-btn>
        <v-btn outlined color="accent" class="caption" to="/register" min-width="100">Register</v-btn>
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
