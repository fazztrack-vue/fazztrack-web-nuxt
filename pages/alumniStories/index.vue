<template>
  <div>
    <header style="background-image: url(&quot;https://cdn-images-1.medium.com/max/2000/1*eJC832pG155t4XhGMw_l1Q.png&quot;); background-position: 45.714285714285715% 31.016042780748663%">
      <section class="container-class mx-auto py-6">
        <div class="mb-5" style="max-width: 376px;">
          <a href="https://blog.fazztrack.com" title="Go to fazztrack">
            <img src="https://cdn-images-1.medium.com/max/376/1*LYOxt99Q5XY7OcBcMU6tgQ@2x.png">
          </a>
        </div>
        <h2 class="text-white text-xl tracking-wide">Belajar menjadi software engineer secara online/remote selama 3–6 bulan sampai diterima kerja, tanpa bayar di depan (ISA).</h2>
      </section>
    </header>
    <section class="bg-blue">
      <div class="container-class mx-auto py-3 flex justify-between items-center">
        <div class="flex gap-3">
          <p class="text-[#BDCDE7] font-thin cursor-pointer">Tutorial</p>  
          <div class="w-[1px] bg-white" />
          <p class="text-[#BDCDE7] font-thin cursor-pointer">Daftar Sekarang</p>
        </div>
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-magnifying-glass fa-lg" style="color: #BDCDE7;"></i>
          <i class="fa-brands fa-facebook fa-lg" style="color: #BDCDE7;"></i>
          <i class="fa-brands fa-instagram fa-lg" style="color: #BDCDE7;"></i>
          <p class="border rounded-full py-[1px] px-2 text-[#BDCDE7] text-sm cursor-pointer">Follow</p>
        </div>
      </div>
    </section>
    <main class="container-class mx-auto pb-10">
      <section class="flex gap-8 py-8">
        <div class="w-[65%] border">
          <img :src="datas[0].urlImage" :alt="datas[0].alt" class="w-full" />
        </div>
        <div class="w-[35%] py-3">
          <h1 class="font-bold text-3xl mb-3">{{ datas[0].title }}</h1>
          <p class="font-thin line-clamp-4 mb-5">{{ datas[0].description }}</p>
          <div class="flex items-center gap-2">
            <div class="rounded-full overflow-hidden border w-10">
              <img :src="datas[0].avatarAlumni" alt="ex-avatar" class="w-full" />
            </div>
            <div>
              <p class="text-blue-600 font-thin text-sm">{{ datas[0].nameAlumni }}</p>
            <div class="flex items-center gap-2">
              <p class="font-thin text-sm">{{ datas[0].createdAt }}.</p>
              <p class="font-thin text-sm">{{ datas[0].timeRead }}</p>
            </div>
            </div>
          </div>
        </div>
      </section>
      <main class="grid grid-cols-3 gap-5">
        <div v-for="item in datas" :key="item.id">
          <CardStories :item="item" />
        </div>
      </main>
    </main>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue'
import CardStories from '~/components/molecules/CardStories.vue';
  import { dataStory } from '~/data/story';
  export default defineComponent({
    auth: false,
    components: { CardStories },
    layout: "NavFoot",
    data() {
        return {
            datas: dataStory || []
        };
    }
})
</script>
<style>
  .bg-blue{
  background-color: rgba(16, 63, 120, 1);
  }
</style>