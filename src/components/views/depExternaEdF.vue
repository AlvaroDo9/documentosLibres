<template lang="pug">
  transition( name="fade")
    Modal(v-if="isOpen" @close="closeModal" :titulo="`${tituloDep}`" size="slim" show=true)
      .columns(v-show="mostrar")
        .column
          input.input(type="hidden" v-model="form.id")
          input.input(type="hidden" v-model="form.movimiento" value='M')
          p.nombre {{ form.nombre }}
          br
          .field
            .label Correo electrónico
            .control
              input.input(type="text" v-model="form.correo" placeholder="Digite el correo electrónico")
          .field
            .label Teléfono
            .control
              input.input(type="text" v-model="form.telefono" placeholder="Digite el número telefónico")
          .field
            .label Orden
            .control
              input.input(type="text" v-model="form.orden" placeholder="Digite un número")
          br
          div.box
            div.one
              Button( theme="primary" tag='button' size="medium" :disabled="isFormEmpty" :loading="isloadingBtn" @click.native="guardar") Guardar
            div.one
              Button( theme="default" tag='button' size="medium" @click.native="closeModal") Cancelar
            div.dos
            div.tres
              Button( theme="secondary" tag='button' size="medium" :disabled="isFormEmpty" :loading="isloadingBtn" @click.native="eliminar") Suprimir
      .columns(v-show="!mostrar")
        .column
          p.msg(align="center") {{ mensaje }}
          br
          div.box
            div.one(v-show="!exito")
              Button( theme="primary" tag='button' size="big" @click.native="reintentar") Reintentar
            div.one(v-show="!exito")
              Button( theme="default" tag='button' size="big" @click.native="closeModal") Cancelar          
          div.boxmensaje(v-show="exito")
            div
              Button( theme="default" tag='button' size="big" @click.native="closeModal") Aceptar
</template>

<script>
import Modal from '@/components/ui/molecules/Modal.vue'
import Button from '@/components/ui/atoms/Button.vue'

export default {
  components: {
    Modal,
    Button,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    itemProp: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        id: this.itemProp.id || 0,
        nombre: this.itemProp.nombre || '',
        correo: this.itemProp.correo || '',
        telefono: this.itemProp.telefono || '',
        orden: this.itemProp.orden || '',
        idPadre: this.itemProp.idPadre || 0,
        idHijo: this.itemProp.idHijo || 0,
        index: this.itemProp.index || 0,
        movimiento: 'M',
      },
      isloadingBtn: false,
      mostrar: true,
      mensaje: '',
      exito: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    reintentar() {
      this.mostrar = true
      this.isloadingBtn = false
    },
    guardar() {
      this.isloadingBtn = true
      this.$store
        .dispatch(
          'enlaces/guardarHijo',
          {
            id: this.form.id,
            correo: this.form.correo,
            telefono: this.form.telefono,
            orden: this.form.orden,
            idPadre: this.itemProp.idPadre,
            idHijo: this.form.idHijo,
            movimiento: this.form.movimiento,
          },
          {
            root: true,
          }
        )
        .then(
          (res) => {
            this.closeModal()
            this.$store.commit('sesion/SET_SUCCESS', true, { root: true })
            setTimeout(() => {
              this.$store.commit('sesion/SET_SUCCESS', false, { root: true })
            }, 3000)
            console.info(res.data.session)
          },
          (err) => {
            console.error(err)
            const error = {
              error: String(err),
              mensajeAccion: 'Guardando Datos',
            }
            this.$store.commit('error/SET_ERROR', error, { root: true })
          }
        )
    },
    eliminar() {
      this.isloadingBtn = true
      this.$store
        .dispatch(
          'enlaces/eliminarEnlace',
          {
            id: this.form.id,
            correo: this.form.correo,
            telefono: this.form.telefono,
            orden: this.form.orden,
            idPadre: this.itemProp.idPadre,
            idHijo: this.form.idHijo,
            index: this.itemProp.index,
            movimiento: 'E',
          },
          {
            root: true,
          }
        )
        .then(
          (res) => {
            const borrarEnlace = res.data.catalogo.borrarEnlace
            this.mostrar = false
            if (borrarEnlace) {
              this.mensaje = 'Se eliminó con éxito'
              this.exito = true
              this.closeModal()
              this.$store.commit('sesion/SET_SUCCESS', true, { root: true })
              setTimeout(() => {
                this.$store.commit('sesion/SET_SUCCESS', false, { root: true })
              }, 3000)
            } else {
              this.mensaje = 'No se pudo eliminar el enlace'
              this.exito = false
            }
          },
          (err) => {
            console.error(err)
            const error = {
              error: String(err),
              mensajeAccion: 'Guardando Datos',
            }
            this.$store.commit('error/SET_ERROR', error, { root: true })
          }
        )
    },
  },
  computed: {
    tituloDep() {
      const accion = this.form.id ? 'Editar' : 'Nuevo'
      return `${accion} usuario de sistema`
    },
    isFormEmpty() {
      return !(this.form.telefono && this.form.correo && this.form.orden)
    },
  },
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';

.box {
  display: flex;
}
.one {
  flex: 1 1 auto;
}
.dos {
  flex: 2 2 auto;
}
.tres {
  align-items: right;
}
.nombre {
  font-size: variables.$fs-18;
  font-weight: bold;
  line-height: 1em;
  padding-bottom: 0.25em;
  color: variables.$secondary_dark_color;
}
</style>
