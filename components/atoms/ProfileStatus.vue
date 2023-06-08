<template>
  <div class="bg-slate-200 py-4 px-5 rounded-md">
    <i v-if="type === 'grad'" class="fa-solid fa-graduation-cap" style="color: gray;"></i>
    <i v-if="type === 'star'" class="fa-solid fa-star" style="color: gray;"></i>
    <i v-if="type === 'trophy'" class="fa-solid fa-trophy" style="color: gray;"></i>
    <i v-if="type === 'grup'" class="fa-solid fa-people-group" style="color: gray;"></i>
    <i v-if="type === 'suitcase'" class="fa-solid fa-suitcase" style="color: gray;"></i>
  </div>
</template>
<script lang="ts">
  export default {
    props: {
      type: {
        type: String,
        required: true
      }
    }
  }
</script>
<style>
  
</style>