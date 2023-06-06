<template lang="">
  <div
    class="relative z-20"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <form
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 mt-20"
        @submit.prevent="handleEdit">
        <div v-if="detailVidio.isLoading">
          <LoadingComponent />
        </div>
        <div v-else-if="detailVidio.isError" class="text-2xl font-semibold flex items-center">
          {{detailVidio.errMessage}}
          <button class="btn btn-error btn-circle ml-5" @click="closeModal"><i class="fa-solid fa-xmark fa-2xl"></i></button>
        </div>
        <div v-else class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="w-full">
              <div class="my-5">
                <p class="text-center font-semibold text-xl">Edit Vidio</p>
              </div>
              <!-- {{detailVidio.data.data.id}} -->
              <div class="w-full mb-4">
                <InputComponent
                  :default-value="vidio.title"
                  type="text"
                  label="Judul Vidio"
                  name="title"
                  placeholder="Masukan judul vidio..."
                  @on-change="handldeInput" />
              </div>
              <div class="w-full mb-4">
                <InputComponent
                  :default-value="vidio.description"
                  type="text"
                  label="deskripsi"
                  name="description"
                  placeholder="Masukan Deskripsi..."
                  @on-change="handldeInput" />
              </div>
              <div class="w-full mb-4">
                <InputComponent
                  :default-value="vidio.cover"
                  type="text"
                  label="URL Cover Vidio"
                  name="cover"
                  placeholder="Masukan url cover vidio..."
                  @on-change="handldeInput" />
              </div>
              <div class="w-full mb-4">
                <InputComponent
                  :default-value="vidio.rating"
                  type="number"
                  label="Rating"
                  name="ratting"
                  placeholder="Masukan ratting Vidio..."
                  @on-change="handldeInput" />
              </div>
              <div class="w-full mb-4">
                <InputComponent
                  :default-value="vidio.level"
                  type="text"
                  label="Level"
                  name="level"
                  placeholder="Masukan level vidio..."
                  @on-change="handldeInput" />
              </div>
              <div class="w-full mb-10">
                <InputComponent
                  :default-value="vidio.price"
                  type="number"
                  label="Harga"
                  name="price"
                  placeholder="Masukan harga vidio..."
                  @on-change="handldeInput" />
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              class="inline-flex w-full justify-center rounded-md bg-success px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-succes/70 sm:ml-3 sm:w-auto">
              Save Edit
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="showModal">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import LoadingComponent from "@/components/atoms/LoadingComponent.vue"
import InputComponent from '@/components/atoms/InputComponent.vue'


interface ICard {
  title: string;
  description: string;
  cover: string;
  rating: number;
  level: string;
  price: number;
}

interface Data {
  vidio: ICard;
  idVidio: number;
}

export default defineComponent({
  components: {
    InputComponent, 
    LoadingComponent,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data(): Data {
    return {
      vidio: {
        title: "",
        description: "",
        cover: "",
        rating: 0,
        level: "",
        price: 0,
      },
      idVidio: this.id,
    };
  },
  computed: {
    ...mapGetters({
      detailVidio: "vidio/getDetail",
    }),
  },
  methods: {
    ...mapActions({
      fetchDetail: "vidio/getVidioDetail",
      editVidio: "vidio/editVidio",
    }),
    showModal() {
      this.$emit("on-click", "");
    },
    handldeInput(data: any) {
      console.log(data);
      if (data.name === "title") {
        this.vidio.title = data.value;
      } else if (data.name === "description") {
        this.vidio.description = data.value;
      } else if (data.name === "cover") {
        this.vidio.cover = data.value;
      } else if (data.name === "rating") {
        this.vidio.rating = data.value;
      } else if (data.name === "level") {
        this.vidio.level = data.value;
      } else {
        this.vidio.price = data.value;
      }
    },
    handleGetById() {
      this.fetchDetail(this.idVidio).then((res) => {
        this.vidio = res.data;
        
      })
    },
    closeModal(){
      this.$emit("on-click", "");
    },
    handleEdit() {
      this.editVidio({ id: this.id, body: this.vidio }).then((_res:any) => {
        this.$emit("on-edit", "");
        this.$emit("on-click", "");
      })
    },
  },
  mounted() {
    this.handleGetById();
  },
});
</script>
<style lang=""></style>
