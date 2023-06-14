<template>
  <div class="bg-white sticky top-[5rem] z-40 flex shadow-1 justify-center">
    <nav class="container-class px-2 w-full flex items-center gap-4">
      <div v-for="item in options" :key="item.id">
        <p v-if="item.active" class="text-sm text-black font-semibold py-3 cursor-pointer border-b-4 border-[#ef6807]">{{item.value}}</p>
        <p v-else class="text-[#797e86] text-sm hover:text-black font-semibold py-3 cursor-pointer border-b-4 border-white hover:border-[#ef6807]" @click="selectedNav(item.id)">{{item.value}}</p>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
  import {PropType, defineComponent} from 'vue'
  interface IOptions {
      id: number
      value: string
      active: boolean
  }
  export default defineComponent({
    props:{
      options : {
        type: Array as PropType<IOptions[]>,
        required : true
      }
    },
    methods: {
      selectedNav(id : number){
          const indexActiveNew = this.options.findIndex((n) => n.id === id)
          const indexActiveRecent = this.options.findIndex((n) => n.active === true)
          const dataActive = this.options[indexActiveRecent]
          dataActive.active = false
          const dataSelected = this.options[indexActiveNew]
          dataSelected.active = true
          this.$emit('on-selected', dataSelected)
      }
    }
  })
</script>
<style>

</style>