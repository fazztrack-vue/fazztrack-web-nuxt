<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted(){
    this.$router.push('/minicamp')
  },
})
</script>
