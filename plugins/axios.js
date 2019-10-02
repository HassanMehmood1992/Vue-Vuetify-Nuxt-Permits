import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.apiUrl
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

if (localStorage.getItem('access_token')) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.access_token
}

export default ({ store, redirect }) => {
  const requestHandler = request => {
    store.dispatch('app/setLoading', true)
    return request
  }

  const successHandler = response => {
    store.dispatch('app/setLoading', false)
    if (response && !!response.data.success && !response.data.success) {
      window.getApp.snackbar = {
        show: true,
        text: response.data.message
          ? response.data.message
          : 'An unexpected error has occurred. Please try again sometime later.'
      }
    }

    return response
  }

  const errorHandler = error => {
    store.dispatch('app/setLoading', false)
    if (error.response) {
      if (_.includes([403, 405], error.response.status)) {
        window.getApp.snackbar = {
          show: true,
          text: error.response.data.message
            ? error.response.data.message
            : 'An unexpected error has occurred. Please try again sometime later.'
        }
        store.dispatch('auth/deleteToken')
        redirect('/login')
      } else if (error.response.status == 401) {
        window.getApp.snackbar = {
          show: true,
          text: 'Your session has expired. Please login in again.'
        }
        store.dispatch('auth/deleteToken')
        redirect('/login')
      } else if (error.response.data.error == 'invalid_grant') {
        window.getApp.snackbar = {
          show: true,
          text: error.response.data.error_description
            ? error.response.data.error_description
            : 'An unexpected error has occurred. Please try again sometime later.'
        }
      } else {
        window.getApp.snackbar = {
          show: true,
          text: error.response.data.message
            ? error.response.data.message
            : 'An unexpected error has occurred. Please try again sometime later.'
        }
      }
    } else {
      window.getApp.snackbar = {
        show: true,
        text:
          'An unexpected error has occurred. Please try again sometime later.'
      }
    }

    return error
  }

  axios.interceptors.request.use(request => requestHandler(request))

  axios.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  )
}

window.axios = axios
Vue.prototype.axios = axios
