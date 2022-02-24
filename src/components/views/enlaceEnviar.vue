<template lang="pug">
  transition( name="fade")
    Modal(v-if="isOpen" @close="closeModal" :titulo="`${tituloEnviar}`" size="slim" show=true)
      br
      .columns(v-show="mostrar")
        .column
          .field
            .label.msg(align="center") La información se enviará a:
            .control
              p.correo {{ form.correo }}
              input.input(type="hidden" v-model="form.correo")
          br
          div.box
            div.one
              Button( theme="primary" tag='button' size="big" :disabled="isFormEmpty" :loading="isloadingBtn" @click.native="enviar") Enviar
            div.one
              Button( theme="default" tag='button' size="big" @click.native="closeModal") Cancelar
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
        cuenta: this.itemProp.cuenta || 0,
        correo: this.itemProp.correo || '',
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
    enviar() {
      this.isloadingBtn = true
      this.$store
        .dispatch(
          'enlaces/enviarCorreo',
          {
            id: this.form.id,
            cuenta: this.form.cuenta,
            correo: this.form.correo,
            idPadre: this.itemProp.idPadre,
            idHijo: this.itemProp.idHijo,
          },
          {
            root: true,
          }
        )
        .then(
          (res) => {
            const correoenviado = res.data.catalogo.enviarcorreo
            this.mostrar = false
            if (correoenviado) {
              this.mensaje = 'Se envió con éxito'
              this.exito = true
            } else {
              this.mensaje = 'No se pudo enviar el correo'
              this.exito = false
            }
          },
          (err) => {
            console.error(err)
            const error = {
              error: String(err),
              mensajeAccion: 'Enviando correo',
            }
            this.$store.commit('error/SET_ERROR', error, { root: true })
          }
        )
    },
  },
  computed: {
    tituloEnviar() {
      const accion = this.form.id ? '' : 'Nuevo'
      return `${accion} Confirmación de envío`
    },
    isFormEmpty() {
      return !(this.form.id && this.form.cuenta && this.form.correo.trim())
    },
  },
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';
.msg {
  font-size: variables.$fs-18;
  font-weight: bold;
  line-height: 2em;
  padding-bottom: 0.25em;
  color: variables.$secondary_dark_color;
}
p.correo {
  font-size: variables.$fs-15;
  line-height: 1em;
  text-align: center;
  padding-bottom: 0.25em;
  color: variables.$secondary_dark_color;
}
.box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.boxmensaje {
  display: flex;
  flex-direction: row;
  justify-content: right;
}
.one {
  padding: 1.5rem;
}
.enviar {
  margin: 1.5rem;
}
</style>
