import eliminar from '@/store/modules/eliminar'
import error from '@/store/modules/error'
import sesion from '@/store/modules/sesion'
import tipoDocumento from '@/store/modules/tipoDocumento'
import depExterna from '@/store/modules/depExterna'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sesion,
    error,
    tipoDocumento,
    eliminar,
    depExterna,
  },
})
