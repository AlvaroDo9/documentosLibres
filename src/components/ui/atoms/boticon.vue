<template lang="pug">
  Component(
    :is="tag" 
    :class="`boticon boticon--${theme} boticon--${size}`"
    :icono="icono"
  )
    component(
      :is="icono")
</template>

<script>
import Plus from './icons/plus.vue'
import Pencil from './icons/pencil.vue'
import Pdf from './icons/pdf.vue'
import Trash from './icons/trash.vue'
import Userplus from './icons/userplus.vue'
export default {
  components: {
    Plus,
    Pencil,
    Pdf,
    Trash,
    Userplus,
  },
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    theme: {
      type: String,
      default: 'default',
      validator(value) {
        const themes = ['primary', 'secondary', 'default']
        return themes.includes(value)
      },
    },
    size: {
      type: String,
      default: 'big',
      validator(value) {
        const size = ['small', 'medium', 'big']
        return size.includes(value)
      },
    },
    icono: {
      type: String,
      default: 'Pencil',
      validator(value) {
        const icono = ['Plus', 'Pencil', 'Pdf', 'Trash', 'Userplus']
        return icono.includes(value)
      },
    },
  },
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';
.boticon {
  height: 38px;
  width: 38px;
  position: relative;
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: variables.$sh-400;
  & svg {
    width: 20px;
    height: 20px;
  }
  &--small {
    height: 24px;
    width: 24px;
    & svg {
      width: 18px;
      height: 18px;
    }
  }
  @each $theme, $fondo, $color in variables.$palette {
    &--#{$theme} {
      background-color: $fondo;
      &:hover,
      &:focus {
        background-color: darken($fondo, 15%);
      }
      &[disabled] {
        background-color: $fondo;
        opacity: 0.5;
        cursor: not-allowed;
      }
      & svg {
        fill: $color !important;
      }
      & svg > path {
        fill: $color !important;
      }
    }
  }
}
</style>
