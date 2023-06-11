<template lang="">
  <div class="w-full flex justify-center">
    <div class="container flex justify-center">
      <div
        v-if="detailVidio.isLoading"
        class="w-full h-[100vh] flex items-center justify-center bg-gray-500 bg-opacity-90 transition-opacity absolute"
      >
        <LoadingComponent />
      </div>
      <form
        v-else
        action=""
        class="w-full border-[1px] p-4 sm:p-12 lg:p-20 rounded-md my-12 max-w-2xl"
        @submit.prevent="handleEdit"
      >
        <div class="w-full flex flex-col items-center">
          <div>
            <LogoFazz />
          </div>
          <p class="text-xl font-semibold mb-2">Edit Data Vidio</p>
        </div>
        <div class="w-full">
          <div class="w-full mb-4">
            <InputComponent
              :default-value="form.title"
              type="text"
              label="Judul Vidio"
              name="title"
              placeholder="Masukan judul vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              :default-value="form.description"
              type="text"
              label="deskripsi"
              name="description"
              placeholder="Masukan Deskripsi..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              :default-value="form.cover"
              type="text"
              label="URL Cover Vidio"
              name="cover"
              placeholder="Masukan url cover vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              :default-value="`${form.rating}`"
              type="number"
              label="Ratting"
              name="ratting"
              placeholder="Masukan ratting Vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              :default-value="form.level"
              type="text"
              label="Level"
              name="level"
              placeholder="Masukan level vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-10">
            <InputComponent
              :default-value="`${form.price}`"
              type="number"
              label="Harga"
              name="harga"
              placeholder="Masukan harga vidio..."
              @on-change="handleInput"
            />
          </div>
        </div>
        <BtnPrimary title="Edit Vidio" />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Swal from "sweetalert2";
import BtnPrimary from '~/components/atoms/BtnPrimary.vue'
import LoadingComponent from '@/components/atoms/LoadingComponent.vue'
import InputComponent from '@/components/atoms/InputComponent.vue'
import LogoFazz from '~/components/atoms/LogoFazz.vue'


interface Input{
  name:string,
  value:string
}

interface IForm {
  [key: string]: string
}

interface Data {
  form: IForm
  idVidio: number | string
}

export default defineComponent({
  components: {
    InputComponent,
    BtnPrimary,
    LoadingComponent,
    LogoFazz
  },
  layout: 'NavFoot',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data(): Data {
    return {
      form: {
        title: '',
        description: '',
        cover: '',
        rating: '',
        level: '',
        price: '',
      },
      idVidio: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters({
      detailVidio: 'vidio/getDetail',
    }),
  },
  methods: {
    ...mapActions({
      fetchDetail: 'vidio/getVidioDetail',
      editVidio: 'vidio/editVidio',
    }),
    showModal() {
      this.$emit('on-click', '')
    },
    handleInput(data: Input) {
      this.form[data.name] = data.value
    },
    handleGetById() {
      this.fetchDetail({id:this.idVidio, $axios: this.$axios}).then((res) => {
        this.form = res.data
      })
    },
    closeModal() {
      this.$emit('on-click', '')
    },
    handleEdit() {
      this.editVidio({ id: this.idVidio, body: this.form, $axios: this.$axios }).then((_res) => {
          Swal.fire("Edit Success!", "", "success");
          this.$router.push('/onlineCourse')
      })
    },
  },
  mounted() {
    this.handleGetById()
  },
})
</script>
