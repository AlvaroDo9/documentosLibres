<template lang="pug">
.contenedor
  Header.header
  .main
    router-view
  Sidebar.sidebar
  Success(v-show="isSuccess")
  Error(v-show="isError" :error="msError")  
  NoSession(v-show="showNoSesion")
  Delete(v-if="isDelete")
</template>
<script>
import { mapState } from 'vuex'
import Header from '@/components/common/Header.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Error from '@/components/ui/molecules/Error.vue'
import NoSession from '@/components/ui/molecules/NoSession.vue'
import Success from '@/components/ui/molecules/Success.vue'
import Delete from '@/components/ui/molecules/Delete.vue'

export default {
  components: {
    Header,
    Sidebar,
    Error,
    NoSession,
    Success,
    Delete,
  },
  computed: {
    ...mapState('error', ['isError', 'msError']),
    ...mapState('eliminar', ['isDelete', 'msDelete']),
    ...mapState('sesion', ['showNoSesion', 'isSuccess']),
  },
}
</script>
<style lang="scss">
@import '@/assets/scss/main.scss';
html,
body {
  overflow: hidden;
}
.contenedor {
  margin: 0;
  display: grid;
  height: 100vh;
  grid-template-columns: 200px auto;
  grid-template-rows: 50px auto;
  grid-template-areas:
    'header header'
    'sidebar main';
  overflow: hidden;
}
.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
  overflow-y: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
