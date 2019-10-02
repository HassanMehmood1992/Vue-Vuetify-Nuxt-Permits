<template>
  <v-container fluid class="mt-12 login-page">
    <v-layout wrap>
      <v-flex xs12 sm12 md6>
        <v-layout wrap class="mt-12 d-flex justify-center">
          <v-flex xs12 sm12 md8 class="mb-10 d-flex justify-center">
            <img src="~/assets/images/permitpad_logo.png" class="logo" alt />
          </v-flex>
          <v-flex xs12 sm12 md8 class="mt-12">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Email Address"
                v-model="model.emailAddress"
                autocomplete="new-password"
                @keyup.enter="onLogin"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="model.password"
                autocomplete="new-password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="onLogin"
              ></v-text-field>
            </v-form>
          </v-flex>
          <v-flex xs12 sm12 md8>
            <div class="d-flex justify-space-between align-center">
              <v-checkbox v-model="model.rememberMe" color="primary">
                <template v-slot:label>
                  <div class="body-2 primary-color">Remember Me</div>
                </template>
              </v-checkbox>
              <v-btn
                text
                x-small
                class="body-2 text-capitalize"
                color="primary"
                to="/forgot-password"
              >Forgot Password</v-btn>
            </div>
          </v-flex>
          <v-flex xs12 sm12 md8 class="d-flex mt-5">
            <div class="caption">
              No Account yet?
              <router-link to="/register" class="no-decoration pointer accent--text">Register here</router-link>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mr-2 caption"
              min-width="200"
              @click="onLogin"
              :loading="loading"
            >Login</v-btn>
            <!-- <v-btn outlined color="accent" class="caption" to="/register" min-width="100">Register</v-btn> -->
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
import cryptojs from 'crypto-js'
import qs from 'qs'
import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default {
  layout: 'default',
  components: {
    VueReCaptcha
  },

  data: () => ({
    valid: false,
    showPassword: false,
    model: {
      emailAddress: '',
      password: '',
      rememberMe: false
    },
    loading: false,
    title: 'Login'
  }),

  head() {
    return {
      titleTemplate: `${this.title} - %s`
    }
  },

  mounted() {
    VueReCaptcha(Vue, {
      siteKey: '6Le-PrcUAAAAAEWTbA1MbguvRjxYDjNJIuMO1vZJ',
      loaderOptions: {
        autoHideBadge: true
      }
    })
  },

  methods: {
    onLogin() {
      this.loading = true
      this.$store
        .dispatch('auth/getToken', {
          username: this.model.emailAddress,
          password: this.model.password
        })
        .then(response => {
          this.$store
            .dispatch('auth/getUserDetails', response.data.user_id)
            .then(resp => {
              this.$router.push({ path: '/dashboard' })
            })
            .catch(error => {})
            .finally(() => {
              this.loading = false
            })
        })
        .catch(error => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/global.scss';

.login-page {
  .logo {
    width: 200px;
    height: 30px;
  }
}
</style>
