<template>
  <div>
    <ToastSuccess v-if="isAlert" title="Success Add Minicamp" />
    <main class="pb-20 z-10 border">
      <header class="container-class px-2 py-10 mx-auto">
        <h1 class="font-bold pb-10 text-2xl lg:text-4xl font-sora">Part-time bootcamp bersama expert terkemuka</h1>
        <div class="lg:flex lg:pb-8 items-center justify-between w-2/3">
          <LogoText :label="`Top Trainer dari Perusahaan`" type="top-trainer" />
          <LogoText :label="`Proyek Level Industri`" type="proyek-industri" />
          <LogoText :label="`Live Class`" type="live-class" />
        </div>
      </header>
      <NavbarSection :options="options" @on-selected="filterMinicamp" />
      <section>
        <div v-if="$auth.loggedIn && listMinicamp.isError === false"  class="container-class px-2 pt-10 mx-auto text-right">
          <button class="border-2 rounded-md py-2 px-3 sm:px-2 bg-primary-orange text-white tracking-wide border-primary-orange" @click="moveRoute('/minicamp/addMinicamp')"><i class="fa-solid fa-circle-plus fa-2xl"></i></button>
        </div>
        <main class="container-class px-5 py-10 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 items-stretch">
          <SkeletonMinicamp v-if="listMinicamp.isLoading === true" />
          <div v-if="listMinicamp.isError === true" class="col-start-2">
            <p class="bg-red-300 rounded-md py-3 text-center font-semibold">{{listMinicamp.errMessage}}</p>
          </div>
          <div v-for="item in listMinicamp.data.data" :key="item.id">
            <CardMinicamp v-if="listMinicamp.isLoading === false" :options="item" />
          </div>
      </main>
      </section>
    </main>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue'
  import { mapGetters, mapActions } from 'vuex';
  import '~/style/global.css'

  import Swal from 'sweetalert2';
  import LogoText from '~/components/atoms/LogoText.vue';
  import NavbarSection from '~/components/molecules/NavbarSection.vue';
  import CardMinicamp from '~/components/molecules/CardMinicamp.vue';
  import SkeletonMinicamp from '~/components/atoms/SkeletonMinicamp.vue';
  import ToastSuccess from '~/components/atoms/ToastSuccess.vue';
  
  interface IOptions {
    id : number
    value : string
    active : boolean
  }

  interface Data {
    options : IOptions[]
    isModal : boolean
    isAlert: boolean
  }

  export default defineComponent({
    components:{
      LogoText,
      NavbarSection,
      CardMinicamp,
      ToastSuccess,
      SkeletonMinicamp
    },
    layout: 'NavFoot',
    // auth:false,
    data() : Data {
        return{
          options:[
            {id : 1,
            value : 'Semua',
            active: true},
            {id : 2,
            value : 'Disalurkan',
            active: false},
            {id : 3,
            value : 'Tidak Disalurkan',
            active: false},
        ],
        isModal : false,
        isAlert : false
      }
    },
    computed:{
      ...mapGetters({
        listMinicamp : "minicamp/getList",
        listDisalurkan : "minicamp/getListDisalurkan",
        listTidakDisalurkan : "minicamp/getListTidakDisalurkan",
      })
    },
    mounted(){
      this.fetchDataMinicamp({$axios: this.$axios})
    },
    methods:{
      handleModal(): void{
        this.isModal = !this.isModal
      },
      filterMinicamp(_data : any){
        Swal.fire('API tidak men-support filter', '', 'info')    
      },
      moveRoute(path : string){
        this.$router.push(path)
      },
      ...mapActions({
        fetchDataMinicamp : "minicamp/getListMinicamp",
      })
    },
  })
</script>
<style lang="">
  
</style>
