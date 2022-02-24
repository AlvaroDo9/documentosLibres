import { aMinusSinAcento } from '@/services/aMinusSinAcento'
import eventServices from '@/services/eventServices'

const state = {
  catalogo: [],
  enlaces_a: [],
  ambito: 1,
  keyword: '',
  keyword_e: '',
  sort_by: 'orden',
  sort_by_e: 'nombre',
}
const getters = {
  filtradoPorAmbito: (state) => {
    if (state.catalogo.length) {
      return state.catalogo.filter((item) => {
        return item.ambito === state.ambito
      })
    }
  },
  orderedItems: (state, getters) => {
    const items = [...getters.filtradoPorAmbito].sort((a, b) => {
      if (a[state.sort_by] > b[state.sort_by]) {
        return 0
      }
      if (a[state.sort_by] < b[state.sort_by]) {
        return 0
      }
      return 0
    })
    return items
  },
  orderedItemsEnlace: (state) => {
    const items = [...state.enlaces_a].sort((a, b) => {
      if (a[state.sort_by_e] > b[state.sort_by_e]) {
        return 1
      }
      if (a[state.sort_by_e] < b[state.sort_by_e]) {
        return -1
      }
      return 0
    })
    return items
  },
  filteredByKeyword: (state, getters) => {
    if (state.catalogo.length) {
      // la busqueda la pasamos a minisculas y le quitamos los acentos
      const search = aMinusSinAcento(state.keyword.trim())
      // sin datos de busqueda muestra todos los items
      if (!search.length) return getters.orderedItems
      //Con datos de busqueda filtra los items que incluya la propiedad nombre,
      return getters.orderedItems.filter((item) => {
        return (
          aMinusSinAcento(item.enlaces.map((e) => e.nombre).join(' ')).includes(
            search
          ) ||
          aMinusSinAcento(item.enlaces.map((e) => e.cuenta).join(' ')).includes(
            search
          ) ||
          aMinusSinAcento(item.enlaces.map((e) => e.correo).join(' ')).includes(
            search
          ) ||
          aMinusSinAcento(
            item.Subdependencias.map((e) =>
              e.enlaces.map((f) => f.nombre).join(' ')
            ).join(' ')
          ).includes(search) ||
          aMinusSinAcento(
            item.Subdependencias.map((e) =>
              e.enlaces.map((f) => f.cuenta).join(' ')
            ).join(' ')
          ).includes(search) ||
          aMinusSinAcento(
            item.Subdependencias.map((e) =>
              e.enlaces.map((f) => f.correo).join(' ')
            ).join(' ')
          ).includes(search)
        )
      })
    }
  },
  filteredByKeywordEnlace: (state, getters) => {
    if (state.enlaces_a.length) {
      // la busqueda la pasamos a minisculas y le quitamos los acentos
      const search = aMinusSinAcento(state.keyword_e.trim())
      // sin datos de busqueda muestra todos los items
      if (!search.length) return getters.orderedItemsEnlace
      //Con datos de busqueda filtra los items que incluya la propiedad nombre,
      return getters.orderedItemsEnlace.filter((item) => {
        return (
          aMinusSinAcento(item.nombre).includes(search) ||
          aMinusSinAcento(item.cuenta).includes(search)
        )
      })
    }
  },
}
const mutations = {
  SET_VACIO(state) {
    state.catalogo = []
  },
  SET_CATALOGO(state, payload) {
    state.catalogo = payload
  },
  SET_ENLACES_A(state, payload) {
    state.enlaces_a = payload
  },
  UPDATE_KEYWORDS(state, payload) {
    state.keyword = payload
  },
  UPDATE_KEYWORDSE(state, payload) {
    state.keyword_e = payload
  },
  UPDATE_AMBITO(state, payload) {
    state.ambito = payload
  },
  ADD_CATALOGO_PADRE(state, { datos, id, idHijo }) {
    const indexPadre = state.catalogo.findIndex((item) => item.id === id)
    if (idHijo > 0) {
      const indexHijo = state.catalogo[indexPadre].Subdependencias.findIndex(
        (item) => item.id === idHijo
      )
      for (let i = 0; i < datos.length; i++) {
        state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces.push(
          datos[i]
        )
      }
    } else {
      for (let i = 0; i < datos.length; i++) {
        state.catalogo[indexPadre].enlaces.push(datos[i])
      }
    }
  },
  UPDATE_CATALOGO_HIJO(state, { datos }) {
    const indexPadre = state.catalogo.findIndex(
      (item) => item.id === datos.idPadre
    )
    if (datos.idHijo > 0) {
      const indexHijo = state.catalogo[indexPadre].Subdependencias.findIndex(
        (item) => item.id === datos.idHijo
      )
      const indexEnlace = state.catalogo[indexPadre].Subdependencias[
        indexHijo
      ].enlaces.findIndex((item) => item.id === datos.id)
      state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces[
        indexEnlace
      ].correo = datos.correo
      state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces[
        indexEnlace
      ].telefono = datos.telefono
      state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces[
        indexEnlace
      ].orden = datos.orden
    } else {
      const indexEnlace = state.catalogo[indexPadre].enlaces.findIndex(
        (item) => item.id === datos.id
      )
      state.catalogo[indexPadre].enlaces[indexEnlace].correo = datos.correo
      state.catalogo[indexPadre].enlaces[indexEnlace].telefono = datos.telefono
      state.catalogo[indexPadre].enlaces[indexEnlace].orden = datos.orden
    }
  },
  UPDATE_ENVIAR_CORREO(state, { datos }) {
    const indexPadre = state.catalogo.findIndex(
      (item) => item.id === datos.idPadre
    )
    if (datos.idHijo > 0) {
      const indexHijo = state.catalogo[indexPadre].Subdependencias.findIndex(
        (item) => item.id === datos.idHijo
      )
      const indexEnlace = state.catalogo[indexPadre].Subdependencias[
        indexHijo
      ].enlaces.findIndex((item) => item.id === datos.id)
      state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces[
        indexEnlace
      ].enviarcorreo = datos.enviarcorreo
      state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces[
        indexEnlace
      ].timer = datos.timer
    } else {
      const indexEnlace = state.catalogo[indexPadre].enlaces.findIndex(
        (item) => item.id === datos.id
      )
      state.catalogo[indexPadre].enlaces[indexEnlace].enviarcorreo =
        datos.enviarcorreo
      state.catalogo[indexPadre].enlaces[indexEnlace].timer = datos.timer
    }
  },
  DELETE_CATALOGO_HIJO(state, { datos, index }) {
    const indexPadre = state.catalogo.findIndex(
      (item) => item.id === datos.idPadre
    )
    if (datos.idHijo > 0) {
      const indexHijo = state.catalogo[indexPadre].Subdependencias.findIndex(
        (item) => item.id === datos.idHijo
      )
      state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces.splice(
        state.catalogo[indexPadre].Subdependencias[indexHijo].enlaces.indexOf(
          index
        ),
        1
      )
    } else {
      state.catalogo[indexPadre].enlaces.splice(
        state.catalogo[indexPadre].enlaces.indexOf(index),
        1
      )
    }
  },
}
const actions = {
  obtenerDatos(context) {
    const numSesion = context.rootState.sesion.numSesion
    const url = `jsonDepext9.asp`
    const params = {}
    eventServices
      .getData(url, params)
      .then((response) => {
        if (response.data.session === numSesion) {
          const data = response.data.catalogo.items
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
  actualizarPadre(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, nombre, siglas, orden } = payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `dependenciasAjax.asp`
      const params = JSON.stringify({
        id,
        nombre,
        siglas,
        orden,
      })
      eventServices
        .putData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const data = res.data.catalogo
            console.log(data)
            context.commit('UPDATE_CATALOGO_PADRE', data)
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
  insertarPadre(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, nombre, siglas, ambito, orden, movimiento } = payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `dependenciasAjax`
      const params = JSON.stringify({
        id,
        nombre,
        siglas,
        ambito,
        orden,
        movimiento,
      })
      eventServices
        .postData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const data = res.data.catalogo
            console.log(data)
            context.commit('ADD_CATALOGO_PADRE', data)
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
  obtenerDatosEnlaces(context) {
    const numSesion = context.rootState.sesion.numSesion
    const url = `jsonCuentas.asp`
    const params = {}
    eventServices
      .getData(url, params)
      .then((response) => {
        if (response.data.session === numSesion) {
          const data = response.data.enlaces_a.items
          context.commit('SET_ENLACES_A', data)
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
  guardarEnlaceDep(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, idHijo, enlaces_a } = payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `cuentasDepAjax.asp`
      const params = JSON.stringify({
        id,
        idHijo,
        enlaces_a,
      })
      eventServices
        .postData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const datos = res.data.catalogo
            context.commit('ADD_CATALOGO_PADRE', { datos, id, idHijo })
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = {
            error: String(err),
            mensajeAccion: 'Guardando Datos',
          }
          context.commit('error/SET_ERROR', error, { root: true })
        })
    })
  },
  guardarHijo(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, correo, telefono, orden, idPadre, idHijo, movimiento } =
        payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `cuentaEnlaceAjax.asp`
      const params = JSON.stringify({
        id,
        correo,
        telefono,
        orden,
        idPadre,
        idHijo,
        movimiento,
      })
      eventServices
        .postData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const datos = res.data.catalogo
            if (id !== 0) {
              context.commit('UPDATE_CATALOGO_HIJO', { datos })
            }
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = {
            error: String(err),
            mensajeAccion: 'Guardando Datos',
          }
          context.commit('error/SET_ERROR', error, { root: true })
        })
    })
  },
  enviarCorreo(context, payload) {
    return new Promise((resolve, reject) => {
      const { id, cuenta, correo, idPadre, idHijo } = payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `correoAjax.asp`
      const params = JSON.stringify({
        id,
        cuenta,
        correo,
        idPadre,
        idHijo,
      })
      eventServices
        .postData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const datos = res.data.catalogo
            context.commit('UPDATE_ENVIAR_CORREO', { datos })
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = {
            error: String(err),
            mensajeAccion: 'Enviando',
          }
          context.commit('error/SET_ERROR', error, { root: true })
        })
    })
  },
  eliminarEnlace(context, payload) {
    return new Promise((resolve, reject) => {
      const {
        id,
        correo,
        telefono,
        orden,
        idPadre,
        idHijo,
        index,
        movimiento,
      } = payload
      const numSesion = context.rootState.sesion.numSesion
      const url = `deleteEnlaceAjax.asp`
      const params = JSON.stringify({
        id,
        correo,
        telefono,
        orden,
        idPadre,
        idHijo,
        index,
        movimiento,
      })
      eventServices
        .postData(url, params)
        .then((res) => {
          if (res.data.session === numSesion) {
            resolve(res)
            const datos = res.data.catalogo
            if (id !== 0) {
              context.commit('DELETE_CATALOGO_HIJO', { datos, index })
            }
          } else {
            context.commit('sesion/showNohaySesion', true, {
              root: true,
            })
          }
        })
        .catch((err) => {
          reject(err)
          const error = {
            error: String(err),
            mensajeAccion: 'Guardando Datos',
          }
          context.commit('error/SET_ERROR', error, { root: true })
        })
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
