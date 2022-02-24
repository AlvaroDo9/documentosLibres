<template lang="pug">
div
  input.input(value='Hola mundo')
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.input {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  color: #363636;

  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-color: #dbdbdb;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}
.input:hover {
  outline: none;
  border: 1px solid #eee;
  box-shadow: 0 0 0 4px rgba(121, 121, 121, 0.2);
  background: #fff;
}
.input:focus {
  outline: none;
  border-color: #485fc7;
  border: 1px solid #ccc;
  box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
  box-shadow: 0 0 0 4px rgba(121, 121, 121, 0.2);
}
</style>
