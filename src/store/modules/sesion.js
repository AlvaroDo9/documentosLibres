import { apiUrl } from '@/services/config'
import axios from 'axios'
const state = {
  packageVersion: process.env.PACKAGE_VERSION || '0',
  isLoading: false,
  isSuccess: false,
  showNoSesion: false, //Estado default false
  permisoAdmin: true,
  permisos: {},
  numSesion: 1, // dejarlo en 1 Cuando este en producción
}
const getters = {
  appVersion: (state) => {
    return state.packageVersion
  },
}
const mutations = {
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_SUCCESS(state, payload) {
    state.isSuccess = payload
  },
  SET_PERMISOS(state, payload) {
    state.permisos = payload
  },
  showNohaySesion(state, payload) {
    state.showNoSesion = payload
  },
}
const actions = {
  obtenerPermisos(context) {
    const url = ` ${apiUrl}JsonPermisos2.asp`
    const numSesion = context.state.numSesion
    axios
      .get(url, {
        timeout: 10000,
      })
      .then((response) => {
        if (response.data.session === numSesion) {
          const data = response.data.Permisos.permisos
          context.commit('SET_PERMISOS', data)
        } else {
          context.commit('showNohaySesion', true)
        }
      })
      .catch((err) => {
        const error = `Cargando Permisos <br> ${String(err)} `
        context.commit('error/textoError', { string: error }, { root: true })
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
