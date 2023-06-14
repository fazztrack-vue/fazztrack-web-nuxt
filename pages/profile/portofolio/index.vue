<template>
  <div class="bg-[#f3f4f5] min-h-[100vh]">
    <main class="container-profile profile mx-auto flex justify-between gap-2 py-[40px] min-h-[90vh] relative">
      <div class="hidden lg:block">
        <SideBar />
      </div>
      <section class="flex-1 lg:ml-[20%] lg:flex justify-between items-start gap-5 mx-2 md:mx-0">
        <SideProfileGlobal />
        <section class="flex-1 flex flex-col gap-8 pt-3">
          <section class="header flex justify-between items-center">
            <div class="flex">
              <p class="text-sm border-b-4 border-slate-300 px-1 py-3 cursor-pointer" @click="moveRouter('/profile/about')">Tentang</p>
              <div class="border-b-4 border-slate-300 w-2" />
              <p class="text-sm border-b-4 border-primary-orange px-1 py-3 cursor-pointer">Portofolio</p>
            </div>
          </section>
          <main class="grid md:grid-cols-2 lg:grid-cols-3">
            <section class="bg-white border-[1px] border-[#dee1e5] p-10 flex flex-col items-center gap-2 cursor-pointer">
              <div class="bg-green-50 rounded-full p-5">
                <i class="fa-solid fa-plus fa-2xl" style="color:green ;scale;: 2 "></i>
              </div>
              <h3 class="font-bold text-lg">Tambah Portofolio</h3>
              <p class="text-center text-slate-400 text-sm">Tambah dan deskripsikan portofolio untuk mendukung profil kamu</p>
            </section>
          </main>
        </section>
      </section>    
    </main>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SideBar from '~/components/molecules/SideBar.vue';
  import SideProfileGlobal from '~/components/molecules/SideProfileGlobal.vue';

  export default defineComponent({
    name: "PortofolioProfile",
    components: {
        SideBar,
        SideProfileGlobal,
    },
    layout: 'ProfileLayout',
    methods:{
      moveRouter(path :string) {
        this.$router.push(path)
      }
    }
  })
</script>

<style>
  .linear-gradient{
    background-image: linear-gradient(268.2deg,#f8d389,#f5c462);
  }
</style>
