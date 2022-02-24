<template>
  <component
    :is="tag"
    :class="`btn btn--${theme} ${block && 'btn--block'} btn--${size} ${
      loading && 'is-loading'
    } `"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'a',
      validator(value) {
        return ['a', 'button', 'router-link'].includes(value)
      },
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
        const size = ['micro', 'small', 'medium', 'big']
        return size.includes(value)
      },
    },
    block: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';
a,
button {
  line-height: 100%;
}
%loading {
  color: transparent !important;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
}
%after-loading {
  -webkit-animation: spinAround 500ms infinite linear;
  animation: spinAround 500ms infinite linear;
  border: 2px solid variables.$secondary-dark-color;
  border-radius: 9999px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: '';
  display: block;
  height: 1em;
  width: 1em;
  position: absolute;
  left: calc(50% - (1em * 0.5));
  top: calc(50% - (1em * 0.5));
  -webkit-user-select: none;
  user-select: none;
}
%btn-template {
  font-family: variables.$font-family;
  border: 1px solid variables.$secondary-color;
  color: variables.$secondary-dark-color;
  margin-bottom: 0.5rem;
  border-radius: 0.4em;
  font-size: variables.$fs-btn-big;
  padding: 1em 1.3em;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  background: white;
  display: inline-block;
  box-shadow: 0px 4px 6px -4px rgba(24, 39, 75, 0.12);
  margin-right: 0.5rem;
  &:hover,
  &:focus {
    background-color: darken(white, 15%);
  }
  &[disabled] {
    background: white;
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.btn {
  @extend %btn-template;
  &--medium {
    font-size: variables.$fs-btn-medium;
    letter-spacing: 0.04em;
    padding: 0.7em 1em;
    font-weight: 600;
    border-radius: 0.4em;
  }
  &--small {
    font-size: variables.$fs-btn-small;
    padding: 0.5em 1em;
    font-weight: 600;
    letter-spacing: auto;
    text-transform: none;
    border-radius: 0.2em;
    box-shadow: none;
  }
  &--micro {
    padding: 0.25em 0.6em 0.2em 0.6em;
    font-weight: 600;
    font-size: variables.$fs-btn-small;
    letter-spacing: auto;
    text-transform: none;
    border-radius: 0.1em;
  }
  &--block {
    display: block;
    width: 100%;
  }
  &.is-loading {
    @extend %loading;
    &::after {
      @extend %after-loading;
    }
  }
  @each $name, $fondo, $color, $borde in variables.$palette {
    &--#{$name} {
      background-color: $fondo;
      border-color: $borde;
      color: $color;
      &:hover,
      &:focus {
        background-color: darken($fondo, 15%);
      }
      &[disabled] {
        background-color: $fondo;
        opacity: 0.5;
        cursor: not-allowed;
      }
      &.is-loading {
        &::after {
          border-color: $color;
          border-right-color: transparent;
          border-top-color: transparent;
        }
      }
    }
  }
}
@-webkit-keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
