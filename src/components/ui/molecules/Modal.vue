<template lang="pug">
  .modal-backdrop()
    transition(name="slide-fade")
      section.modal(@click.stop :class="`modal--${size}`" v-if="show2")
        .modal__head
          .modal__head-left
            .modal__title {{titulo}}
            .modal__subtitle {{subtitulo}}
          button.modal__close(aria-label="Cerrar" @click="close") &times;
        .modal__body  
          slot
</template>
<script>
export default {
  props: {
    titulo: {
      type: String,
      default: 'Hello',
    },
    subtitulo: {
      type: String,
    },
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['slim', 'wide', 'default'].includes(value)
      },
    },
    show: {
      type: Boolean,
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
      this.$emit('close')
    },
    // handleKeyDown({ key }) {
    //   if (key === 'Escape') {
    //     this.close()
    //   }
    // },
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
  align-items: flex-start;
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
.modal__head {
  background-color: variables.$background-dark-color;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
}
.modal__head-left {
  padding: 0;
  display: flex;
  align-items: flex-end;
  padding: 0 !important;
}
.modal__title {
  color: variables.$text-inverted-color;
  padding-left: 1rem;
  font-size: variables.$fs-modal-header-title;
  font-weight: 400;
  padding-bottom: 0 !important;
  line-height: 1em;
}
.modal__subtitle {
  color: variables.$text-inverted-color;
  padding-left: 1rem;
  font-size: variables.$fs-modal-header-subtitle;
  font-weight: 200;
  padding-bottom: 0 !important;
  line-height: 1em;
}
.modal__close {
  padding: 0 1rem;
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: variables.$text-inverted-color;
}
.modal-close:focus {
  outline: 2px solid var(--primary-color);
}
.modal__body {
  background: white;
  padding: 1rem 2rem;
  overflow-y: auto;
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
</style>
