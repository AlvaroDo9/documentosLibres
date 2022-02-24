<template lang="pug">
  nav.panel
    div.panel-block.tab-border
      p.panel-tabs
        a.active(href="#0") Internas
        a.mr-5.ml-5(href="#0") Staff
</template>
<script>
export default {}
</script>
<style scoped lang="scss">
@use '@/assets/styles/settings/_variables.scss';

.tab-border {
  border-bottom: 1px solid variables.$text-color-default;
}
a {
  font-size: 1.3rem;
}
a.active {
  padding: 6px;
  color: variables.$secondary-dark-color;
  border-width: 0 0 4px;
  border-style: solid;
  padding-inline: 2.5rem;
  font-weight: bold;
}
</style>
