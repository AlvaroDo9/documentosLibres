<template lang="pug">
  .modal-backdrop(@click="close")
    transition(name="slide-fade")
      section.modal(@click.stop :class="`modal--${size}`" )
        .modal__body
          .modal__icon
            Icon(iconColor='red')
          .modal__mensaje
            h4 {{error.mensajeAccion}}
            p(v-html="error.error")
          .modal__cerrar
            button.modal__close(aria-label="Cerrar" @click="close") &times;
</template>
<script>
import Icon from '@/components/ui/atoms/icons/exclamation.vue'

export default {
  components: {
    Icon,
  },
  props: {
    error: {
      type: Object,
    },
    size: {
      type: String,
      default: 'slim',
      validator(value) {
        return ['slim', 'wide', 'default'].includes(value)
      },
    },
  },
  data() {
    return {
      show2: false,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
    this.show2 = this.show
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    close() {
      this.$store.commit('error/SET_ERROR_EMPTY', {}, { root: true })
    },
    handleKeyDown({ key }) {
      if (key === 'Escape') {
        this.close()
      }
    },
  },
}
</script>
<style scoped lang="scss">
@use '@/assets/styles/settings/_variables.scss';

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 1rem;
}
.modal {
  position: relative;
  min-width: 30rem;
  max-height: 100vh;
  overflow: auto;
  box-shadow: 0 1.4px 3.4px rgba(0, 0, 0, 0.045),
    0 3.3px 8.2px rgba(0, 0, 0, 0.065), 0 6.1px 15.5px rgba(0, 0, 0, 0.08),
    0 10.9px 27.7px rgba(0, 0, 0, 0.095), 0 20.5px 51.8px rgba(0, 0, 0, 0.115),
    0 49px 124px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  &--slim {
    width: 35rem;
  }
  &--default {
    width: 50rem;
  }
  &--wide {
    width: 60rem;
  }
}

.modal__close {
  font-size: 1.7rem;
  line-height: 100%;
  background: variables.$exclamation-color;
  border-radius: 50%;
  height: 28px;
  width: 28px;
  border: none;
  cursor: pointer;
  color: variables.$warning-color;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-close:focus {
  outline: 2px solid var(--primary-color);
}
.modal__body {
  background: variables.$warning-color;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  color: variables.$text-color;
}
.modal__icon {
  & svg {
    width: 60px;
    height: 60px;
  }
}
.modal__mensaje {
  flex-grow: 6;
  & p {
    font-size: variables.$fs-16;
  }
}
.modal__cerrar {
  flex-grow: 40px;
}
</style>
