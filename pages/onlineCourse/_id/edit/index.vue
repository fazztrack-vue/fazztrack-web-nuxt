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
          {{ idVidio }}
        </div>
        <div class="w-full">
          <div class="w-full mb-4">
            <InputComponent
              :default-value="vidio.title"
              type="text"
              label="Judul Vidio"
              name="title"
              placeholder="Masukan judul vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              type="text"
              label="deskripsi"
              name="description"
              placeholder="Masukan Deskripsi..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              type="text"
              label="URL Cover Vidio"
              name="cover"
              placeholder="Masukan url cover vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              type="number"
              label="Ratting"
              name="ratting"
              placeholder="Masukan ratting Vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-4">
            <InputComponent
              type="text"
              label="Level"
              name="level"
              placeholder="Masukan level vidio..."
              @on-change="handleInput"
            />
          </div>
          <div class="w-full mb-10">
            <InputComponent
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
import BtnPrimary from '~/components/atoms/BtnPrimary.vue'
import LoadingComponent from '@/components/atoms/LoadingComponent.vue'
import InputComponent from '@/components/atoms/InputComponent.vue'

interface ICard {
  title: string
  description: string
  cover: string
  rating: number
  level: string
  price: number
}

interface Data {
  vidio: ICard
  idVidio: number | string
}

export default defineComponent({
  components: {
    InputComponent,
    BtnPrimary,
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
        title: '',
        description: '',
        cover: '',
        rating: 0,
        level: '',
        price: 0,
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
    handleInput(data: any) {
      if (data.name === 'title') {
        this.vidio.title = data.value
      } else if (data.name === 'description') {
        this.vidio.description = data.value
      } else if (data.name === 'cover') {
        this.vidio.cover = data.value
      } else if (data.name === 'rating') {
        this.vidio.rating = data.value
      } else if (data.name === 'level') {
        this.vidio.level = data.value
      } else {
        this.vidio.price = data.value
      }
    },
    handleGetById() {
      this.fetchDetail(this.idVidio).then((res) => {
        this.vidio = res.data
      })
    },
    closeModal() {
      this.$emit('on-click', '')
    },
    handleEdit() {
      this.editVidio({ id: this.idVidio, body: this.vidio }).then((res) => {
        console.log(res)
      })
    },
  },
  mounted() {
    this.handleGetById()
  },
})
</script>
