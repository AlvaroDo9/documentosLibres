<template lang="pug">
Container
          
</template>

<script>
import Container from '@/components/ui/objects/Container.vue'
import Button from '@/components/ui/atoms/Button.vue'
import Box from '@/components/ui/atoms/Box.vue'
import Modal from '@/components/ui/molecules/Modal.vue'
import SwitchButton from '@/components/ui/atoms/switch.vue'
export default {
  components: {
    Container,
    Modal,
    Button,
    Box,
    SwitchButton,
  },
  data() {
    return {
      isOpen: false,
      switch1: false,
    }
  },
  methods: {
    changeSwitch(e) {
      this.switch1 = e
    },
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';

.separador {
  margin-top: 2rem;
  border-bottom: 1px solid #000;
}
</style>
