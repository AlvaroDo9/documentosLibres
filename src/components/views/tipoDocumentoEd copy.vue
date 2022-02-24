<template lang="pug">
  transition( name="fade")
    Modal(v-if="isOpen" @close="closeModal" titulo="Editar tipo de documento" size="slim" show=true)
      .columns
        .column
          .field
            .label Descripción
            .control
              input.input(type="text" v-model="form.descripcion" placeholder="Text input")
          .field
            .label Siglas
            .control
              input.input(type="text" v-model="form.siglas" placeholder="Text input")
          .field
            .label Estado
            .control
              label.radio
                input(type="radio" name="estadoVigente" :value="true" v-model="form.estadoVigente")
                |  Activo
              label.radio
                input(type="radio" name="estadoVigente" :value="false" v-model="form.estadoVigente")
                |  Inactivo
          .field
            .label Para Turnar
            .control
              label.radio
                input(type="radio" name="esTurnada" :value="true" v-model="form.esTurnada")
                |  Si
              label.radio
                input(type="radio" name="esTurnada" :value="false" v-model="form.esTurnada")
                |  No

          Button( theme="primary" tag='button' size="medium" :disabled="isFormEmpty" :loading="isloadingBtn" @click.native="guardar") Guardar
          Button( theme="default" tag='button' size="medium" @click.native="closeModal") Cancelar
          //- p {{$data}}
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
    itema: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        id: this.itema.id || 0,
        descripcion: this.itema.descripcion || '',
        siglas: this.itema.siglas || '',
        estadoVigente: this.itema.estadoVigente || false,
        esTurnada: this.itema.esTurnada || false,
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
      const accion = this.form.id ? 'actualizar' : 'insertar'
      this.$store
        .dispatch(
          `tipoDocumento/${accion}`,
          {
            id: this.form.id,
            descripcion: replaceComSimpleDobleComa(this.form.descripcion),
            siglas: replaceComSimpleDobleComa(this.form.siglas),
            estadoVigente: this.form.estadoVigente,
            esTurnada: this.form.esTurnada,
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
            console.info(res.data.session, '_')
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
    isFormEmpty() {
      return !(this.form.descripcion.trim() && this.form.siglas)
    },
  },
}
</script>
<style></style>
