<template lang="">
    <div>
        <header class="container-class py-10 mx-auto">
          <h1 class="font-bold pb-10 text-4xl font-sora">
            Part-time bootcamp bersama expert terkemuka
          </h1>
          <div class="flex pb-8 items-center justify-between w-2/3">
            <LogoText :label="`Top Trainer dari Perusahaan`" type="top-trainer" />
            <LogoText :label="`Proyek Level Industri`" type="proyek-industri" />
            <LogoText :label="`Live Class`" type="live-class" />
          </div>
        </header>
        <div
          v-if="listVidio.isLoading"
          class="fixed z-[60] inset-0 bg-[#494c51] opacity-90 flex justify-center items-center">
          <Loading />
        </div>
        <div v-else-if="listVidio.isError" class='text-2xl font-semibold w-full flex justify-center h-20 items-center'>
          {{listVidio.errMessage}}
        </div>
        <div
          v-else
          class="flex flex-col items-center w-full">
          <section class="w-full flex flex-col items-center container-class mt-10">
            <div class="w-full bg-[#f1f2f3] p-6 rounded-md relative">
              <p class="font-semibold text-xl text-[#1d1e20] mb-5">
                Online Course Terpopuler
              </p>
              <div class="carousel w-full">
                <div
                  v-for="(item, index) in listVidio.data.data"
                  :id="'slide' + (index + 1)"
                  :key="index"
                  class="carousel-item relative w-[23%] mx-[1%]">
                  <CardVidio
                    :title="item.title"
                    :cover="item.cover"
                    :level="item.level" />
                </div>
              </div>
              <a
                :href="slide"
                class="btn btn-circle bg-white absolute -left-5 top-[180px]"
                @click="backCarousel">
                <i class="fa-solid fa-angle-left text-black"></i>
              </a>
              <a
                :href="slide"
                class="btn btn-circle bg-white absolute -right-5 top-[180px]"
                @click="moveCorousel">
                <i class="fa-solid fa-angle-right text-black"></i>
              </a>
            </div>
            <div class="w-full bg-[#f1f2f3] p-6 rounded-md relative mt-8">
              <p class="font-semibold text-xl text-[#1d1e20] mb-5">
                Online Course Untuk Pemula
              </p>
              <div class="carousel w-full">
                <div
                  v-for="(item, index) in listVidio.data.data"
                  :id="'slide' + item"
                  :key="index"
                  class="carousel-item relative w-[23%] mx-[1%]">
                  <CardVidio
                    :title="item.title"
                    :cover="item.cover"
                    :level="item.level" />
                </div>
              </div>
              <a
                :href="slide"
                class="btn btn-circle bg-white absolute -left-5 top-[180px]"
                @click="backCarousel">
                <i class="fa-solid fa-angle-left text-black"></i>
              </a>
              <a
                :href="slide"
                class="btn btn-circle bg-white absolute -right-5 top-[180px]"
                @click="moveCorousel">
                <i class="fa-solid fa-angle-right text-black"></i>
              </a>
            </div>
            <div class="w-full mt-10">
              <p class="mb-10 font-semibold text-2xl text-[#1d1e20]">
                Semua Online Course
              </p>
              <div
                class="w-full wrap-input p-3 border mb-10 rounded-md focus-within:border-red-900 focus-within:shadow-[0_0_0.25rem_rgba(242,129,48,.2)]">
                <i class="fa fa-search mr-3"></i>
                <input
                  type="serach"
                  placeholder="Cari kelas untuk pekerjaan impianmu"
                  class="focus:outline-none border-l-[1px] pl-3 w-full max-w-md" />
              </div>
            </div>
            <div class="w-full grid grid-cols-4 gap-4">
              <div
                v-for="(item, index) in listVidio.data.data"
                :key="index"
                class="w-full relative cursor-pointer">
                <div
                  v-if="isLogin"
                  class="flex gap-1 absolute top-1 z-[11] right-2 lg:right-3 xl:right-8">
                  <button
                    class="bg-[#1cb314] w-8 h-8 rounded-full flex justify-center items-center"
                    @click="moveEdit(item.id)">
                    <i class="fa-regular fa-pen-to-square fa-md"></i>
                  </button>
                  <!-- <DeletModal v-if="modalStatus" :id="id" @on-delete="handleDelete"/> -->
                  <button
                    class="bg-error w-8 h-8 rounded-full flex justify-center items-center"
                    @click="handleDelete(item.id)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
                <CardVidio
                  :title="item.title"
                  :cover="item.cover"
                  :level="item.level" />
              </div>
            </div>
            <div v-if="isLogin" class="w-full flex justify-center">
              <button
                class="btn btn-outline hover:bg-white hover:text-[#1d1e20]"
                @click="moveToAddVidio">
                Tambah Data
              </button>
            </div>
            <EditVidioModal
              v-if="modalDeleteStatus"
              :id="id"
              @on-click="showModal"
              @on-edit="fetchData" />
          </section>
        </div>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import Swal from "sweetalert2";
  import { mapGetters, mapActions } from "vuex";
  import EditVidioModal from "~/components/molecules/EditVidioModal.vue";
  import LogoText from "~/components/atoms/LogoText.vue";
  import Loading from "@/components/atoms/LoadingComponent.vue"
  import CardVidio from "~/components/molecules/CardVidio.vue";
  import '@/style/global.css'


  const token = localStorage.getItem("auth._token.local");

  interface IOptions {
    id: number;
    value: string;
    active: boolean;
  }
  
  interface ICard {
    id: number;
    created_at: Date;
    title: string;
    description: string;
    cover: string;
    rating: number;
    level: string;
    price: number;
  }
  interface Data {
    card: ICard[];
    count: number;
    slide: string;
    modalDeleteStatus: boolean;
    modalStatus: boolean;
    id: number;
    loadingStatus: boolean;
    isLogin: string | boolean;
    options: IOptions[];
  }
  
  export default defineComponent({
    components: {
      CardVidio,
      EditVidioModal,
      Loading,
      LogoText,
    },
    layout: 'NavFoot',
    data(): Data {
      return {
        card: [],
        count: 4,
        slide: "",
        modalDeleteStatus: false,
        modalStatus: false,
        id: 0,
        loadingStatus: false,
        isLogin: token || false,
        options: [
          { id: 1, value: "Semua", active: true },
          { id: 2, value: "Disalurkan", active: false },
          { id: 3, value: "Tidak Disalurkan", active: false },
        ],
      };
    },
    computed: {
      ...mapGetters({
        listVidio: "vidio/getList",
      }),
    },
    mounted() {
      this.fetchData({$axios: this.$axios});
    },
    methods: {
      ...mapActions({
        fetchData: "vidio/getListVidios",
        deleteVidio: "vidio/deleteVidio",
      }),
      moveCorousel() {
        if (this.count < 4) {
          this.count = 4;
        } else if (this.count < this.card.length) {
          this.count += 1;
          this.slide = `#slide${this.count}`;
        }
      },
      backCarousel() {
        if (this.count > 1) {
          if (this.count > this.card.length - 4) {
            this.count -= 4;
            this.slide = `#slide${this.count}`;
          } else {
            this.count--;
            this.slide = `#slide${this.count}`;
          }
        }
      },
      moveToAddVidio() {
        this.$router.push("/onlineCourse/addVidio");
      },
      moveEdit(id:string){
        this.$router.push(`/onlineCourse/${id}/edit`);
      },
      showModal(param:number) {
        this.id = param
        this.modalDeleteStatus = !this.modalDeleteStatus;
      },
      handleDelete(id: number) {
        Swal.fire({
          title: "Are you sure?",
          text: "vidio will be removed, are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteVidio(id).then((_res: any) => {
              this.fetchData();
            });
            Swal.fire("Delete Success!", "", "success");
          } else {
            Swal.fire("Delete Failed", "", "info");
          }
        });
      },
    },
  });
  </script>
  