<template>
  <div>
    <ToastSuccess v-if="isAlert" title="Success Add Minicamp" />
    <main class="pb-20 z-10 border">
      <header class="container-class py-10 mx-auto">
        <h1 class="font-bold pb-10 text-4xl font-sora">Part-time bootcamp bersama expert terkemuka</h1>
        <div class="flex pb-8 items-center justify-between w-2/3">
          <LogoText :label="`Top Trainer dari Perusahaan`" type="top-trainer" />
          <LogoText :label="`Proyek Level Industri`" type="proyek-industri" />
          <LogoText :label="`Live Class`" type="live-class" />
        </div>
      </header>
      <NavbarSection :options="options" @on-selected="filterMinicamp" />
      <section>
        <Modal v-if="isModal" @on-confirm="handleConfirm" />
        <div v-if="$auth.loggedIn && listMinicamp.isError === false"  class="container-class pt-10 mx-auto text-right">
          <button class="border-2 rounded-md py-2 px-3 bg-primary-orange text-white tracking-wide border-primary-orange" @click="handleModal"><i class="fa-solid fa-circle-plus fa-2xl"></i></button>
        </div>
        <main class="container-class py-10 mx-auto grid grid-cols-3 gap-8 z-10 items-stretch">
          <SkeletonMinicamp v-if="listMinicamp.isLoading === true" />
          <div v-if="listMinicamp.isError === true" class="col-start-2">
            <p class="bg-red-300 rounded-md py-3 text-center font-semibold">{{listMinicamp.errMessage}}</p>
          </div>
          <div v-for="item in listMinicamp.data" :key="item.id">
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
  import Modal from '~/components/molecules/AddMinicamp.vue'
  import NavbarSection from '~/components/molecules/NavbarSection.vue';
  import CardMinicamp from '~/components/molecules/CardMinicamp.vue';
  import SkeletonMinicamp from '~/components/atoms/SkeletonMinicamp.vue';
  import IDataMinicamp from '~/interfaces/IMinicamp';
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
      Modal,
      ToastSuccess,
      SkeletonMinicamp
    },
    layout: 'NavFoot',
    auth:false,
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
        // dataMinicamps : [] as IDataMinicamp[],
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
      this.fetchDataMinicamp()
    },
    methods:{
      insertData(data : IDataMinicamp) {
        this.insertDataMinicamp(data).then((_res : any) => {
          this.isAlert = true
          setTimeout(() => {
            this.fetchDataMinicamp()
          }, 2000);
        }).catch((error : any) => {
          Swal.fire('Delete Failed!', error.message, 'error')    
        })
      },
      handleModal(): void{
        this.isModal = !this.isModal
      },
      handleConfirm(val : any){
        if(val === 'cancel'){
          this.handleModal()
        }else{
          this.handleModal()
          this.insertData(val)
        }
      },
      filterMinicamp(_data : any){
        Swal.fire('API tidak men-support filter', '', 'info')    
        // if(data.value === 'Disalurkan'){
        //   this.dataMinicamps = this.listDisalurkan
        // }else if(data.value === 'Tidak Disalurkan'){
        //   this.dataMinicamps = this.listTidakDisalurkan
        // }else{
        //   this.dataMinicamps = this.listMinicamp.data
        // }
      },
      ...mapActions({
        fetchDataMinicamp : "minicamp/getListMinicamp",
        insertDataMinicamp : "minicamp/insertDataMinicamp"
      })
    },
  })
</script>
<style lang="">
  
</style>
