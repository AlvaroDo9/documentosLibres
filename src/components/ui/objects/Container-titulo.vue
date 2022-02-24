<template>
  <component :is="tag" class="container-titulo">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';

.container-titulo {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
</style>
