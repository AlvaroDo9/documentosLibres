<template lang="pug">
  nav.panel
    div.panel-block
      p.control.has-icons-right
        input.input.is-normal.is-rounded(type="search" placeholder="Buscar") 
        span.icon.is-normal.is-right.mt-2
          Search
</template>
<script>
import Search from '@/components/ui/atoms/icons/search.vue'
export default {
  components: {
    Search,
  }
}
</script>
