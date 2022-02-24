<template lang="pug">
  transition( name="fade")
    Modal(v-if="isOpen" @close="closeModal" :titulo="tituloDep" size="slim" show=true)
      .columns
        .column
          .field
            .label Dedependencia
            .control
              input.input(type="text" v-model="form.nombre" placeholder="Digite el nombre de la dependencia")
          .field
            .label Siglas
            .control
              input.input(type="text" v-model="form.siglas" placeholder="Digite las siglas de la dependencia")
          .field
            .label Orden
            .control
              input.input(type="number" v-model="form.orden" placeholder="Digite un número")
          Button( theme="primary" tag='button' size="medium" :disabled="isFormEmpty" :loading="isloadingBtn" @click.native="guardar") Guardar
          Button( theme="default" tag='button' size="medium" @click.native="closeModal") Cancelar
          p {{$data}}
</template>

<script>
import Modal from '@/components/ui/molecules/Modal.vue'
import Button from '@/components/ui/atoms/Button.vue'
import { replaceComSimpleDobleComa } from '@/services/replaceComSimpleDobleComa'

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
        siglas: this.itemProp.siglas || '',
        ambito: this.itemProp.ambito || 1,
        orden: this.itemProp.orden || 0,
      },
      isloadingBtn: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    guardar() {
      this.isloadingBtn = true
      const accion = this.form.id ? 'actualizarPadre' : 'insertarPadre'
      this.$store
        .dispatch(
          `depExterna/${accion}`,
          {
            id: this.form.id,
            nombre: replaceComSimpleDobleComa(this.form.nombre),
            siglas: replaceComSimpleDobleComa(this.form.siglas),
            //ambito: this.form.ambito,
            orden: this.form.orden,
            // movimiento: this.form.movimiento,
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
  },
  computed: {
    tituloDep() {
      const accion = this.form.id ? 'Editar' : 'Nueva'
      return `${accion} Dependencia`
    },
    isFormEmpty() {
      return !(
        this.form.nombre.trim() &&
        this.form.siglas &&
        this.form.ambito &&
        this.form.orden
      )
    },
  },
}
</script>
<style></style>
