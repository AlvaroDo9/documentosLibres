<template lang="pug">
Container
  ContainerTitulo
    h1 Dependencias Externas
    .ContainerTitulo__buscar
      .control.has-icons-right
        input.input.is-normal.is-rounded(type="search" placeholder="Buscar"	@keyup.stop.prevent="keyEvent()"
								v-model="keywords")
        span.icon-bus
          Search
    boticon(:class="`boticon--primary boticon--big`" icono="Plus" @click.native="openModalPadre(0)")
  table.table-mod03(v-if="catalogo")
    tbody(v-for="(item, key) in filteredByKeyword")
      tr.tr-padre
        td(width="2%")
          p.numero-padre {{ item.orden }}
        td(width="3%")
          boticon(:class="`boticon--secondary boticon--small`" icono="Pencil" @click.native="openModalPadre(item)")
        td(colspan="4")
          p.nombre-padre {{item.nombre}}
          p.siglas-padre {{item.siglas}}
        td(colspan="2")
          table.table-enlace
            tr.enlace(v-for="(value,index) in orderedItems(item.enlaces)")
              td(width="2%")
                p.numero {{ value.orden }}
              td(width="2%")
                boticon(:class="`boticon--secondary boticon--small`" icono="Pencil" @click.native="openModalHijo(value, item.id, 0, index)")
              td(width="64%")
                ul
                  li.nombre {{ value.titulo }} {{ value.nombre }} {{ value.apellidos }} 
                  li.general {{ value.cargo }}
            tr.enlace
              td(width="2%")
                span.ocultar 1
              td(width="2%") 
                 boticon.ocultar(:class="`boticon--secondary boticon--small`")
              td(width="64%")
                boticon(v-show="item.enlaces.length")(:class="`boticon--secondary boticon--small`" icono="Userplus" @click.native="openModalPadre(item, 0)" )
                Button.nelwrap(v-show="!item.enlaces.length")( theme="default" tag='button' size="small" @click.native="openModalHijo(item, 0)" ) Nuevo Funcionario
              td(width="32%")

      

  ed-modal-padre(:isOpen="isOpenPadre" v-on:closeModal="closeModalPadre" :itemProp="itemSelectedObject" v-if="isOpenPadre")
  ed-modal-hijo(:isOpen="isOpenHijo" v-on:closeModal="closeModalHijo" :itemProp="itemSelectedObject" v-if="isOpenHijo")
  modal-Enviar-Correo(:isOpen="isOpenEnviar" v-on:closeModal="closeModalEnviar" :itemProp="itemSelectedObject" v-if="isOpenEnviar")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EdModalPadre from '@/components/views/depExternaEd.vue'
import EdModalHijo from '@/components/views/depExternaEdF.vue'
import ModalEnviarCorreo from '@/components/views/enlaceEnviar.vue'
import Container from '@/components/ui/objects/Container.vue'
import ContainerTitulo from '@/components/ui/objects/Container-titulo.vue'
import Button from '@/components/ui/atoms/Button.vue'
import Box from '@/components/ui/atoms/Box.vue'
import Modal from '@/components/ui/molecules/Modal.vue'
import boticon from '@/components/ui/atoms/boticon.vue'
import Search from '@/components/ui/atoms/icons/search.vue'

export default {
  name: 'depExterna',
  components: {
    Container,
    Modal,
    Button,
    Box,
    boticon,
    ContainerTitulo,
    EdModalPadre,
    EdModalHijo,
    ModalEnviarCorreo,
    Search,
  },
  data() {
    return {
      isOpenPadre: false,
      isOpenHijo: false,
      isOpenEnviar: false,
      ambitoLocal: [
        { nombre: 'Internas', id: 1 },
        { nombre: 'Staff', id: 2 },
      ],
      keywords: '',
      itemSelectedObject: {},
      sort_by: 'orden',
      time: '',
    }
  },
  computed: {
    ...mapState('depExterna', ['catalogo', 'ambito']),
    ...mapGetters('depExterna', ['filtradoPorAmbito', 'filteredByKeyword']),
  },
  created() {
    this.$store.dispatch('depExterna/obtenerDatos', true, { root: true })
    this.updateAmbitoStore(1)
  },
  methods: {
    orderedItems(value) {
      const items = [...value].sort((a, b) => {
        if (a[this.sort_by] > b[this.sort_by]) {
          return 1
        }
        if (a[this.sort_by] < b[this.sort_by]) {
          return -1
        }
        return 0
      })
      return items
    },
    openModalPadre(item, idHijo) {
      this.isOpenPadre = true
      this.setPropsPadres(item, idHijo)
    },
    openModalEnviar(item, item_e) {
      this.isOpenEnviar = true
      this.setPropsEnviar(item, item_e)
    },
    openModalHijo(item, idPadre, idHijo, index) {
      this.isOpenHijo = true
      this.setPropsHijos(item, idPadre, idHijo, index)
    },
    setPropsPadres(item, idHijo) {
      if (item) {
        this.itemSelectedObject = { ...item, idHijo }
      } else {
        this.itemSelectedObject = {
          id: 0,
          nombre: '',
          correo: '',
          telefono: '',
          edocuenta: '',
          enviarcorreo: false,
          idHijo,
        }
      }
    },
    setPropsHijos(item, idPadre, idHijo, index) {
      if (item) {
        this.itemSelectedObject = { ...item, idPadre, idHijo, index }
      } else {
        this.itemSelectedObject = {
          id: 0,
          nombre: '',
          cuenta: '',
          correo: '',
          telefono: '',
          orden: 0,
          enviarcorreo: false,
          idPadre,
          idHijo,
          index,
        }
      }
    },
    setPropsEnviar(item, item_e) {
      if (item) {
        this.itemSelectedObject = { ...item, item_e }
      } else {
        this.itemSelectedObject = {
          id: 0,
          nombre: '',
          cuenta: '',
          correo: '',
          telefono: '',
          orden: 0,
          enviarcorreo: false,
          timer: '',
        }
      }
    },
    closeModalPadre() {
      this.isOpenPadre = false
    },
    closeModalHijo() {
      this.isOpenHijo = false
    },
    closeModalEnviar() {
      this.isOpenEnviar = false
    },
    updateAmbitoStore(id) {
      this.$store.commit('depExterna/UPDATE_AMBITO', parseInt(id), {
        root: true,
      })
      this.keywords = ''
      this.$store.commit('depExterna/UPDATE_KEYWORDS', this.keywords, {
        root: true,
      })
    },
    changeAmbito(id) {
      this.updateAmbitoStore(id)
    },
    keyEvent() {
      this.$store.commit('depExterna/UPDATE_KEYWORDS', this.keywords, {
        root: true,
      })
    },
  },
  watch: {
    keywords(newVal, oldVal) {
      if (oldVal && !newVal) {
        this.$store.commit('depExterna/UPDATE_KEYWORDS', this.keywords, {
          root: true,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';

.nelwrap {
  white-space: nowrap;
}
.table-mod03 tbody tr {
  filter: none !important;
  background: #fff;
}
.table-enlace {
  width: 100%;
  & tr {
    &.enlace {
      border-bottom: 1px solid variables.$secondary_color;
    }
    &.enlace:last-child {
      border: none;
    }
    & td {
      & .ocultar {
        visibility: hidden;
      }
      & p.numero {
        font-size: variables.$fs-13;
        line-height: 1em;
        padding-top: 0.5em;
        color: variables.$secondary_dark_color;
      }
      & li.general {
        font-size: variables.$fs-13;
        line-height: 1em;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
        color: variables.$secondary_dark_color;
      }
      & li.nombre {
        font-size: variables.$fs-15;
        font-weight: bold;
        line-height: 1em;
        padding-bottom: 0.25em;
        color: variables.$secondary_dark_color;
      }
    }
  }
}
</style>
