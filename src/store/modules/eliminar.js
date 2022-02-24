const state = {
  isDelete: false,
  dataDelete: {},
  moduloStore: '',
  idPadre: '',
  idHijo: '',
}
const mutations = {
  SET_DELETE_EMPTY(state) {
    state.isDelete = false
    state.moduloStore = ''
    state.idPadre = 0
    state.idHijo = 0
  },
  SET_DELETE(state, { moduloStore, idPadre, idHijo }) {
    state.isDelete = true
    state.moduloStore = moduloStore
    state.idPadre = idPadre
    state.idHijo = idHijo
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}
