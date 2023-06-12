<template>
  <div class="card mb-3">
    <div class="border">
      <img :src="item.urlImage" :alt="item.alt" class="w-full h-[200px]"  />
    </div>
    <div class="py-3">
      <h1 class="font-bold text-2xl mb-3">{{ item.title }}</h1>
      <p class="font-thin line-clamp-4 mb-5">{{ item.description }}</p>
      <div class="flex items-center gap-2">
        <div class="rounded-full overflow-hidden border w-10">
          <img :src="item.avatarAlumni" alt="ex-avatar" class="w-full" />
        </div>
        <div>
          <p class="text-blue-600 font-thin text-sm">{{ item.nameAlumni }}</p>
        <div class="flex items-center gap-2">
          <p class="font-thin text-sm">{{ item.createdAt }}.</p>
          <p class="font-thin text-sm">{{ item.timeRead }}</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props:{
      item :{
        type: Object,
        required: true
      },
    },
})
</script>