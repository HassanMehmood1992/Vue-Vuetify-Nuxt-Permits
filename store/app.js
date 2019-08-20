// The store is used to manage the state of action buttons
// rendered in the sub header section across the application
const state = {
  apptitle: '',
  isAdmin: false,
  inputRules: {
    required: value => !!value || 'Required.',
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    }
  },
  masks: {
    phoneNumber: '+###-##-#######'
  }
}
const getters = {
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
const mutations = {
  setAppTitle(state, title) {
    state.apptitle = title
  },

  setIsAdmin(state, val) {
    state.isAdmin = val
  }
}
const actions = {
  setAppTitle(context, actions) {
    state.apptitle = actions
    context.commit('setAppTitle', state.apptitle)
  },

  setIsAdmin(context, actions) {
    state.isAdmin = actions
    context.commit('setIsAdmin', state.isAdmin)
  }
}
export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
