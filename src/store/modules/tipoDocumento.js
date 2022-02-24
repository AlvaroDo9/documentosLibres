import eventServices from '@/services/eventServices.js'

const state = {
  catalogo: [],
}
const mutations = {
  SET_VACIO(state) {
    state.catalogo = []
  },
  SET_CATALOGO(state, payload) {
    state.catalogo = payload
  },
  UPDATE_CATALOGO(state, payload) {
    const indexActual = state.catalogo.findIndex(
      (item) => item.id === payload.id
    )
    state.catalogo[indexActual] = payload
  },
  ADD_CATALOGO(state, payload) {
    state.catalogo.push(payload)
  },
  DELETE(state, payload) {
    const index = state.catalogo.findIndex((item) => item.id === payload)
    state.catalogo.splice(index, 1)
  },
}
const actions = {
  obtenerDatos(context) {
    const numSesion = context.rootState.sesion.numSesion
    const url = `TipoDocumento`
    const params = {}
    eventServices
      .getData(url, params)
      .then((response) => {
        if (response.data.session === numSesion) {
          const data = response.data.catalogo
          context.commit('SET_CATALOGO', data)
        } else {
          context.commit('sesion/showNohaySesion', true, {
            root: true,
          })
        }
      })
      .catch((err) => {
        const error = { error: String(err), mensajeAccion: 'Cargando Datos' }
        context.commit('error/SET_ERROR', error, { root: true })
      })
  },
  actualizar(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, descripcion, siglas, estadoVigente, esTurnada, esEdicion } =
        payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `TipoDocumento`
      const params = {
        id,
        descripcion,
        siglas,
        estadoVigente,
        esTurnada,
        esEdicion,
      }
      eventServices
        .putData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const data = res.data.catalogo
            context.commit('UPDATE_CATALOGO', data)
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = { error: String(err), mensajeAccion: 'Guardando Datos' }
          context.commit('error/SET_ERROR', error, { root: true })
        })
    })
  },
  insertar(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, descripcion, siglas, estadoVigente, esTurnada, esEdicion } =
        payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `TipoDocumento`
      const params = {
        id,
        descripcion,
        siglas,
        estadoVigente,
        esTurnada,
        esEdicion,
      }
      eventServices
        .postData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const data = res.data.catalogo
            context.commit('ADD_CATALOGO', data)
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = { error: String(err), mensajeAccion: 'Guardando Datos' }
          context.commit('error/SET_ERROR', error, { root: true })
        })
    })
  },
  accionEliminar(context, payload) {
    return new Promise((resolve, reject) => {
      const id = payload.idPadre
      const numSesion = context.rootState.sesion.numSesion
      const url = `TipoDocumento`
      const params = {
        id,
        eliminar: true,
      }
      eventServices
        .putData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            context.commit('DELETE', id)
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = { error: String(err), mensajeAccion: 'Guardando Datos' }
          context.commit('error/SET_ERROR', error, { root: true })
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
