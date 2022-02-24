import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/common/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Catalogos/Home',
    },
  },
  {
    path: '/tipoDoc',
    name: 'Tipo Documento',
    component: () =>
      import(
        /* webpackChunkName: "tipoDoc" */ '../components/views/tipoDocumento.vue'
      ),
    meta: {
      title: 'Catalogos/Tipo de Documento',
    },
  },

  {
    path: '/depext',
    name: 'Dependencias Externas  ',
    component: () =>
      import(
        /* webpackChunkName: "depext" */ '../components/views/depExterna.vue'
      ),
    meta: {
      title: 'Catalogos/Dependencias Externas ',
    },
  },
]

const ruta = process.env.VUE_APP_RUTA
const subDir = process.env.VUE_APP_SUBDIR
const router = new VueRouter({
  mode: 'history',
  base: `/${ruta}/${subDir}/`,
  routes,
})

export default router
