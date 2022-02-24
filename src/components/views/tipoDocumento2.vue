<template lang="pug">
Container
  ContainerTitulo
    h1 Tipo de Documento
    boticon(:class="`boticon--primary boticon--big`" icono="Plus" @click.native="openModal(0)")
  table.table-mod01
    thead
      tr.table-mod01__head
        th No
        th(width="5")
        th Descripción
        th Siglas
        th Estado
        th Para turno
        th Eliminar
      tr.table-mod01__espacio-head
        th(colspan="5") &nbsp; 
    tbody
      tr(v-for="(item, key) in catalogo")
        td
          p.tercero {{key + 1}}
        td.a-derecha
          boticon(:class="`boticon--secondary boticon--small`" icono="Pencil" @click.native="openModal(item)")
        td 
          p.nombre {{item.descripcion}}
        td 
          p.secundario {{item.siglas}}
        td 
          p.tercero {{ item.estadoVigente ? "Activo" : "Inactivo" }}
        td 
          p.tercero {{ item.esTurnada ? "Si" : "No"}}
        td.a-derecha
          boticon(:class="`boticon--secondary boticon--small`" icono="Trash" @click.native="actionDelete(item.id, 0)")
  ed-modal(:isOpen="isOpen" v-on:closeModal="closeModal" :itema="itemSelectedObject" v-if="isOpen")
</template>

<script>
import { mapState } from 'vuex'
import EdModal from '@/components/views/tipoDocumentoEd.vue'
import Container from '@/components/ui/objects/Container.vue'
import ContainerTitulo from '@/components/ui/objects/Container-titulo.vue'
import Button from '@/components/ui/atoms/Button.vue'
import Box from '@/components/ui/atoms/Box.vue'
import Modal from '@/components/ui/molecules/Modal.vue'
import boticon from '@/components/ui/atoms/boticon.vue'

export default {
  components: {
    Container,
    Modal,
    Button,
    Box,
    boticon,
    ContainerTitulo,
    EdModal,
  },
  data() {
    return {
      isOpen: false,
      itemSelectedObject: {},
      moduloStore: 'tipoDocumento',
    }
  },
  computed: {
    ...mapState('tipoDocumento', ['catalogo']),
  },
  created() {
    this.$store.dispatch('tipoDocumento/obtenerDatos', true, { root: true })
  },
  methods: {
    openModal(item) {
      this.isOpen = true
      if (item) {
        this.itemSelectedObject = item
      } else {
        this.itemSelectedObject = {
          id: 0,
          descripcion: '',
          siglas: '',
          estadoVigente: true,
          esTurnada: true,
        }
      }
    },
    closeModal() {
      this.isOpen = false
    },
    actionDelete(idPadre, idHijo) {
      const data = {
        moduloStore: this.moduloStore,
        idPadre,
        idHijo,
      }
      console.log(data)
      this.$store.commit('eliminar/SET_DELETE', data, { root: true })
    },
  },
  destroyed() {
    this.$store.commit('tipoDocumento/SET_VACIO')
  },
}
</script>
