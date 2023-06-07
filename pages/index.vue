<template>
  <div class="p-3">
    <p>waiting.......</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted(){
    setTimeout(() => {
      this.$router.push('/minicamp')
    }, 1500);
  }
})
</script>
