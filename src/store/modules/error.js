const state = {
  isError: false,
  msError: {},
}
const mutations = {
  SET_ERROR_EMPTY(state) {
    state.isError = false
    state.msError = {}
  },
  SET_ERROR(state, payload) {
    state.msError = payload
    state.isError = true
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}
