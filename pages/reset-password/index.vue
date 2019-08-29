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
          <v-text-field label="OTP (One-Time-Password)" v-model="otp"></v-text-field>
          <v-text-field
            v-model="newPassword"
            label="New Password"
            :rules="[passwordRules]"
            :type="showNewPassword ? 'text' : 'password'"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (showNewPassword = !showNewPassword)"
            @input="validatePassword"
            validate-on-blur
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            validate-on-blur
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (showConfirmPassword = !showConfirmPassword)"
            :error-messages="confirmPassword && newPassword != confirmPassword ? 'New Password and Confirm Password should match' : ''"
          ></v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs12 sm12 md7 class="mt-5">
        <div class="secondary-color caption">Passwords must contain:</div>
        <ul class="secondary-color caption">
          <li
            :class="passwordValidation.characters ? 'grey--text' : 'primary--text'"
          >At least 6 characters</li>
          <li
            :class="passwordValidation.uppercase ? 'grey--text' : 'primary--text'"
          >At least 1 upper case letter (A...Z)</li>
          <li
            :class="passwordValidation.lowercase ? 'grey--text' : 'primary--text'"
          >At least 1 lower case letter (a...z)</li>
          <li
            :class="passwordValidation.number ? 'grey--text' : 'primary--text'"
          >At least 1 number (0...9)</li>
          <li
            :class="passwordValidation.specialCharacter ? 'grey--text' : 'primary--text'"
          >At least 1 special character</li>
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
    otp: '',
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
    passwordValidation: {
      characters: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialCharacter: false
    }
  }),

  computed: {
    activeLang() {
      return this.$store.state.app.activeLang
    },

    passwordRules() {
      return this.$store.state.app.inputRules.passwordFormat
    }
  },

  methods: {
    validatePassword(value) {
      const characters = /^.{6,}$/
      const uppercase = /(?=.*[A-Z])/
      const lowercase = /(?=.*[a-z])/
      const number = /(?=.*\d)/
      const specialCharacter = /(?=.*[_\W])/

      this.passwordValidation.characters = characters.test(value)
      this.passwordValidation.uppercase = uppercase.test(value)
      this.passwordValidation.lowercase = lowercase.test(value)
      this.passwordValidation.number = number.test(value)
      this.passwordValidation.specialCharacter = specialCharacter.test(value)
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';
</style>
