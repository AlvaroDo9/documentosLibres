<template lang="pug">
  .box
    slot
</template>
<script></script>

<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';

.box {
  padding: 1.63rem;
  border-radius: 0.37rem;
  color: variables.$text-color;
  background: variables.$background-lighter-color;

  box-shadow: 0px 8px 22px -6px rgba(24, 39, 75, 0.12),
    0px 14px 64px -4px rgba(24, 39, 75, 0.12);
}
</style>
