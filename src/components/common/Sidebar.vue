<template lang="pug">
  div
    ul.sidebar__ul
      router-link(to="/")
        li.sidebar__li
          .sidebar__liIcon
            Home
          .sidebar__liTexto Home
      router-link(to="/tipoDoc")
        li.sidebar__li
          .sidebar__liIcon
            Inbox
          .sidebar__liTexto Tipo de Documento
      router-link(to="/depext")
        li.sidebar__li
          .sidebar__liIcon
            Inbox   
          .sidebar__liTexto Dependencias Externas !
</template>

<script>
import Search from '@/components/ui/atoms/icons/search.vue'
import Inbox from '@/components/ui/atoms/icons/inbox.vue'
import Home from '@/components/ui/atoms/icons/home.vue'
export default {
  components: {
    Search,
    Inbox,
    Home,
  },
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/settings/_variables.scss';

.sidebar {
  background-color: variables.$background-dark-color;
  box-shadow: -2px 0px 10px 3px rgba(1, 1, 1, 0.2);
  color: variables.$text-inverted-color;

  &__ul {
    list-style-type: none;
    padding: 0px;
    margin: 0;
  }
  &__li {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 30px auto;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    grid-template-areas: 'icono texto';
    color: variables.$btn-default-color;
  }
  &__lisepara {
    padding-top: 2rem;
    padding-left: 15px;
    grid-area: texto;
    font-size: 11px;
    color: variables.$siderbar-subtitulo;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  &__li:hover {
    background: rgba(0, 0, 0, 0.3);
    opacity: 0.9;
  }
  &__li--active {
    border-right: 6px solid #819595;
  }
  &__liIcon {
    grid-area: icono;
    padding-left: 4px;
    display: flex;
    align-items: center;
    color: variables.$btn-default-color;
    & svg {
      fill: variables.$btn-default-color;
    }
  }
  &__liTexto {
    grid-area: texto;
    font-size: 14px;
  }
}
a.router-link-exact-active li.sidebar__li {
  border-right: 6px solid variables.$sidebar-active;
}
</style>
