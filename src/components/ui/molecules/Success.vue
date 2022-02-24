<template lang="pug">
  .modal-backdrop
    transition(name="slide-fade")
      section.modal.slide
        .modal__body
          .modal__icon
            icon-ok.ok(width="75" height="75")
          .modal__mensaje.show-text
            p.aviso ¡Acción realizada con exito!
</template>
<script>
import iconOk from '@/components/ui/atoms/icons/ok.vue'

export default {
  components: {
    iconOk,
  },
  props: {
    size: {
      type: String,
      default: 'slim',
      validator(value) {
        return ['slim', 'wide', 'default'].includes(value)
      },
    },
  },

  methods: {
    salir() {
      window.location.href = '/'
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
  width: 100%;
  height: 100%;
  background: none;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  padding: 0;
  position: relative;
  overflow: none;
  display: flex;
  min-width: 20rem;
  width: 20rem;
  border-radius: 5px;
  background: variables.$warning-color;
}

.modal__body {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 1rem;
  color: variables.$text-color;
}
.modal__icon {
  position: absolute;
  margin-top: -80px;
}
.modal__mensaje {
  margin-top: 0px;
  & p.aviso {
    text-align: center;
    font-size: 1.2rem;
    color: white;
    line-height: 1.2em;
  }
}

.slide {
  animation: slide-top 1.7s ease 1 forwards;
}
@keyframes slide-top {
  from {
    margin-top: -250px;
    opacity: 0;
  }
  10% {
    opacity: 1;
    margin-top: 0px;
  }
  90% {
    margin-top: 0px;
    opacity: 1;
  }
  to {
    margin-top: 200px;
    opacity: 0;
  }
}

.show-text {
  opacity: 0;
  animation: show-text 0.5s ease-out forwards;
  animation-delay: 0.5s;
}

@keyframes show-text {
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
