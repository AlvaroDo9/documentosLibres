<template lang="pug">
  .switch-button-control(:class='`switch-button-control--${size}`')
    .switch-button( @click="toggle" :style="{'--color': color}" :class="[{ enabled: isEnabled },`switch-button switch-button--${size}` ]")
      .button
    .switch-button-label(@click="toggle")
      slot
</template>

<script>
export default {
  props: {
    isEnabled: Boolean,
    color: {
      type: String,
      required: false,
      default: '#4D4D4D',
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        const size = ['normal', 'big']
        return size.includes(value)
      },
    },
  },
  methods: {
    toggle: function () {
      this.$emit('toggle', !this.isEnabled)
    },
  },
}
</script>

<style lang="scss">
@use '@/assets/styles/settings/_variables.scss';
.switch-button-control {
  display: flex;
  align-items: center;
  $switch-button-height-big: 2.4rem;
  $switch-button-height-normal: 1.6rem;
  $switch-pading: 0.2em;
  $button-side-length-normal: calc(
    #{$switch-button-height-normal} - (2 * #{$switch-pading})
  );
  $button-side-length-big: calc(
    #{$switch-button-height-big} - (2 * (#{$switch-pading}) + 0.4em)
  );
  .switch-button-label {
    font-size: calc(#{$switch-button-height-normal} - (2 * #{$switch-pading}));
    margin-left: 10px;
    cursor: default;
  }
  &--big {
    .switch-button-label {
      font-size: calc(#{$switch-button-height-big} - (0.8rem));
      margin-left: 15px;
    }
  }
  .switch-button {
    $switch-button-color: var(--color);
    $switch-button-border-thickness: 0px;
    $switch-transition: all 0.3s ease-in-out;
    $switch-is-rounded: true;

    height: $switch-button-height-normal;
    width: calc(#{$switch-button-height-normal} * 2);
    box-shadow: inset 0 3px 1px 0 rgb(0 0 0 / 5%), 0 2px 2px 0 rgb(0 0 0 / 10%),
      0 3px 3px 0 rgb(0 0 0 / 5%);
    border-radius: if($switch-is-rounded, $switch-button-height-normal, 0);
    background: variables.$grey-switch;
    transition: $switch-transition;
    cursor: pointer;
    display: flex;
    align-items: center;

    & .button {
      height: $button-side-length-normal;
      width: $button-side-length-normal;
      border-radius: if($switch-is-rounded, $button-side-length-normal, 0);
      background: white;
      transition: $switch-transition;
      box-shadow: 0 3px 1px 0 rgb(0 0 0 / 5%), 0 2px 2px 0 rgb(0 0 0 / 10%),
        0 3px 3px 0 rgb(0 0 0 / 5%);
      transform: translateX($switch-pading);
    }
    &.enabled {
      background-color: $switch-button-color;
      .button {
        transform: translateX(
          calc(
            #{$button-side-length-normal} + (2 * (#{$switch-pading} + 0.1rem))
          )
        );
      }
    }
    &--big {
      height: $switch-button-height-big;
      width: calc(#{$switch-button-height-big} * 2);
      & .button {
        height: $button-side-length-big;
        width: $button-side-length-big;
      }
      &.enabled {
        .button {
          transform: translateX(
            calc(
              #{$button-side-length-big} + (2 * (#{$switch-pading} + 0.4rem))
            )
          );
        }
      }
    }
  }
}
</style>
