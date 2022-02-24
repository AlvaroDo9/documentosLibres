<template lang="pug">
  .modal-backdrop
    transition(name="slide-fade")
      section.modal(:class="`modal--${size}`" )
        .modal__body.ns-effect-bouncyflip
          .modal__icon
            Icon(iconColor='red')
          .modal__mensaje
            p.aviso Aviso:
            h3 La sesión ha expirado.
            br
            Button( theme="secondary" tag='button' size="medium" @click.native="salir") Aceptar

          
</template>
<script>
import Icon from '@/components/ui/atoms/icons/unlock.vue'
import Button from '@/components/ui/atoms/Button.vue'

export default {
  components: {
    Icon,
    Button,
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
  background: rgba(0, 0, 0, 0.7);
  padding-top: 1rem;
}
.modal {
  position: relative;
  overflow: hidden;
  position: fixed;
  top: 20px;
  left: 20px;
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

.modal__body {
  background: variables.$background-lighter-color;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  color: variables.$text-color;
}
.modal__icon {
  flex-grow: 1;

  & svg {
    width: 60px;
    height: 60px;
  }
}
.modal__mensaje {
  flex-grow: 4;
  & p.aviso {
    font-size: 2rem;
    color: grey;
    line-height: 1em;
  }
  & h3 {
    line-height: 1em;
  }
}

/* Bouncy Flip adapted from animate.css by Dan Eden: http://daneden.github.io/animate.css/ */
.ns-effect-bouncyflip {
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
}

@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -90deg);
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 20deg);
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -10deg);
    -webkit-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 5deg);
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  100% {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
</style>
