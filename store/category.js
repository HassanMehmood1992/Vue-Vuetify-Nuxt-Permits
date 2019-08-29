// The store is used to manage the state of action buttons
// rendered in the sub header section across the application
export const state = () => ({
  requestStatuses: [],
  flightTypes: [],
  permitTypes: [],
  purposeOfLanding: [],
  actions: [],
  clearanceTypes: [],
  userTypes: []
})
export const getters = {
  getRequestStatuses() {
    return state.requestStatuses || []
  },

  getFlightTypes() {
    return state.flightTypes || []
  },

  getPermitTypes() {
    return state.permitTypes || []
  },

  getPurposeOfLanding() {
    return state.purposeOfLanding || []
  },

  getActions() {
    return state.actions || []
  },

  getClearanceTypes() {
    return state.clearanceTypes || []
  },

  getUserTypes() {
    return state.userTypes || []
  }
}
export const mutations = {
  setRequestStatuses(state, statuses) {
    state.requestStatuses = statuses
  },

  setFlightTypes(state, types) {
    state.flightTypes = types
  },

  setPermitTypes(state, types) {
    state.permitTypes = types
  },

  setPurposeOfLanding(state, types) {
    state.purposeOfLanding = types
  },

  setActions(state, types) {
    state.actions = types
  },

  setClearanceTypes(state, types) {
    state.clearanceTypes = types
  },

  setUserTypes(state, types) {
    state.userTypes = types
  }
}
export const actions = {
  setRequestStatuses(context, actions) {
    state.requestStatuses = actions
    context.commit('setRequestStatuses', state.requestStatuses)
  },

  setFlightTypes(context, actions) {
    state.flightTypes = actions
    context.commit('setFlightTypes', state.flightTypes)
  },

  setPermitTypes(context, actions) {
    state.permitTypes = actions
    context.commit('setPermitTypes', state.permitTypes)
  },

  setPurposeOfLanding(context, actions) {
    state.purposeOfLanding = actions
    context.commit('setPurposeOfLanding', state.purposeOfLanding)
  },

  setActions(context, actions) {
    state.actions = actions
    context.commit('setActions', state.actions)
  },

  setClearanceTypes(context, actions) {
    state.clearanceTypes = actions
    context.commit('setClearanceTypes', state.clearanceTypes)
  },

  setUserTypes(context, actions) {
    state.userTypes = actions
    context.commit('setUserTypes', state.userTypes)
  }
}
