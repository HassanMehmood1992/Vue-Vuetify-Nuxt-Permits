// The store is used to manage the state of action buttons
// rendered in the sub header section across the application
export const state = () => ({
  apptitle: '',
  isLoggedIn: true,
  isAdmin: false,
  inputRules: {
    required: value => !!value || 'Required.',
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
    passwordFormat: v =>
      (/^.{6,}$/.test(v) &&
        /(?=.*[A-Z])/.test(v) &&
        /(?=.*[a-z])/.test(v) &&
        /(?=.*\d)/.test(v) &&
        /(?=.*[_\W])/.test(v)) ||
      'Passwords must have correct format'
  },
  masks: {
    phoneNumber: '+###-##-#######'
  },
  loading: false
})
export const getters = {
  getAppTitle() {
    return state.apptitle || ''
  },

  getIsAdmin() {
    return state.isAdmin
  },

  getInputRules() {
    return state.inputRules
  }
}
export const mutations = {
  setAppTitle(state, title) {
    state.apptitle = title
  },

  setIsAdmin(state, val) {
    state.isAdmin = val
  },

  setLoading(state, val) {
    state.loading = val
  }
}
export const actions = {
  setAppTitle(context, actions) {
    state.apptitle = actions
    context.commit('setAppTitle', state.apptitle)
  },

  setIsAdmin(context, actions) {
    state.isAdmin = actions
    context.commit('setIsAdmin', state.isAdmin)
  },

  setLoading(context, actions) {
    state.loading = actions
    context.commit('setLoading', state.loading)
  }
}
