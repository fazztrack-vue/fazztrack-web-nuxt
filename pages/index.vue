<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  auth: false,
  mounted(){
    this.$router.push('/about')
  },
})
</script>
