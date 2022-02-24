<template lang="pug">
  transition( name="fade")
    Modal(@close="closeModal" :titulo="`${titulo}`" size="slim" show=true)
      .columns
        .column.eliminar
          p.eliminar__titulo ¿Está segura de eliminar?
          p.eliminar__subtitulo Esta acción no se podra revertir
          Button( theme="primary" tag='button' size="medium" :loading="isloadingBtn" @click.native="eliminar") Eliminar
          Button( theme="default" tag='button' size="medium" @click.native="closeModal") Cancelar
</template>

<script>
import Modal from '@/components/ui/molecules/Modal.vue'
import Button from '@/components/ui/atoms/Button.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Modal,
    Button,
  },

  data() {
    return {
      isloadingBtn: false,
      tituloDep: 'Hola mUndo',
      titulo: 'Advertencia',
    }
  },
  computed: {
    ...mapState('eliminar', ['moduloStore', 'idPadre', 'idHijo']),
  },
  methods: {
    closeModal() {
      this.$store.commit('eliminar/SET_DELETE_EMPTY', {}, { root: true })
    },
    eliminar() {
      this.isloadingBtn = true
      const accionStore = this.moduloStore + '/accionEliminar'
      const data = { idPadre: this.idPadre, idHijo: this.idHijo }
      this.$store.dispatch(accionStore, data, { root: true }).then(
        (res) => {
          this.closeModal()
          this.$store.commit('sesion/SET_SUCCESS', true, { root: true })
          setTimeout(() => {
            this.$store.commit('sesion/SET_SUCCESS', false, { root: true })
          }, 1700)
          console.info(res.data.session, '_')
        },
        (err) => {
          console.error(err)
          const error = {
            error: String(err),
            mensajeAccion: 'Eliminando Datos',
          }
          this.$store.commit('error/SET_ERROR', error, { root: true })
        }
      )
    },
  },
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/settings/_variables.scss';
.eliminar {
  text-align: center;
  &__titulo {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.6em;
    color: variables.$text-color-default;
  }
  &__subtitulo {
    font-size: 1.2rem;
    line-height: 1em;
    font-weight: normal;
    margin-bottom: 2rem;
    color: variables.$text-color-default;
  }
}
</style>
