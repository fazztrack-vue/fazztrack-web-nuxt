<template lang="">
  <div class="w-full flex justify-center">
    <div class="container flex justify-center">
      <div
        v-if="detailMinicamp.isLoading"
        class="w-full h-[100vh] flex items-center justify-center bg-gray-200 bg-opacity-50 transition-opacity absolute"
      >
        <LoadingComponent />
      </div>
      <form
        v-else
        class="w-full border-[1px] p-4 sm:p-12 lg:p-20 rounded-md my-12 max-w-2xl"
        @submit.prevent="editCourse(form)"
      >
        <div class="w-full flex flex-col items-center">
          <div class="mb-3">
            <LogoFazz />
          </div>
          <p class="text-xl font-semibold mb-2">Edit Data Minicamp</p>
        </div>
        <div class="w-full mb-4">
                <InputComponent
                    type="text"
                    label="Title"
                    name="title"
                    :default-value="form.title"
                    placeholder="Masukan title"
                    @on-change="handleInput"/>
                <InputComponent
                    type='text-area'
                    label='Description'
                    :default-value="form.description"
                    name='description'
                    placeholder='Masukan description'
                    @on-change="handleInput"/>
                <InputComponent
                    type="text"
                    :default-value="form.trainerName"
                    label="Trainer Names"
                    name="trainerName"
                    placeholder="Masukan trainer names"
                    @on-change="handleInput"/>   
                <InputComponent
                    type="url"
                    label="Picture"
                    :default-value="form.trainerPicture"
                    name="trainerPicture"
                    placeholder="Masukan picture"
                    @on-change="handleInput"/> 
                <InputComponent
                    type="text"
                    label="Trainer Title"
                    :default-value="form.trainerTitle"
                    name="trainerTitle"
                    placeholder="Masukan trainer title"
                    @on-change="handleInput"/>   
                <InputComponent
                    type="text"
                    label="Batch"
                    :default-value="form.batch"
                    name="batch"
                    placeholder="Masukan batch"
                    @on-change="handleInput"/> 
                <InputComponent
                    type="text"
                    :default-value="form.location"
                    label="Location"
                    name="location"
                    placeholder="Masukan location"
                    @on-change="handleInput"/>
                <InputComponent
                    type="date"
                    :default-value="form.startDate"
                    label="Start Date"
                    name="startDate"
                    placeholder="Masukan start date"
                    @on-change="handleInput"/>  
                <InputComponent
                    type="date"
                    :default-value="form.endDate"
                    label="End Date"
                    name="endDate"
                    placeholder="Masukan end date"
                    @on-change="handleInput"/>  
                <InputComponent
                    type="text"
                    :default-value="form.isWork"
                    label="Is Work"
                    name="is-work"
                    placeholder="Masukan false or true"
                    @on-change="handleInput"/>
                <InputComponent
                    type="number"
                    :default-value="form.price"
                    label="Price"
                    name="price"
                    placeholder="Masukan price"
                    @on-change="handleInput" /> 
        </div>
        <BtnPrimary title="Edit Vidio" />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

import Swal from 'sweetalert2';
import BtnPrimary from '~/components/atoms/BtnPrimary.vue'
import LoadingComponent from '@/components/atoms/LoadingComponent.vue'
import InputComponent from '@/components/atoms/InputComponent.vue'
import LogoFazz from '~/components/atoms/LogoFazz.vue';
import IDataMinicamp from '~/interfaces/IMinicamp';

interface IForm {
  [key: string]: string | number | boolean
}

interface Data {
    id : number
    form: IForm
  }

export default defineComponent({
  components: {
    InputComponent,
    BtnPrimary,
    LoadingComponent,
    LogoFazz
  },
  data() : Data{
        return{
          id : Number(this.$route.params.id)  ,
          form: {
            id : 0,
            created_at: '',
            title: '',
            description: '',
            trainerName: '',
            trainerTitle: '',
            trainerPicture: '',
            batch: '',
            location: '',
            startDate: '',
            endDate: '',
            isWork: false || true,
            price: 0
          }
        }
      },
  computed: {
    ...mapGetters({
      detailMinicamp : "minicamp/getDetail"
    }),
  },
  mounted() {
    this.getDetail(this.id)
  },
  methods: {
    handleInput(data : any){
      this.form.created_at = new Date().toISOString()
      if(data.name === 'is-work'){
        if(data.value === 'false'){
        this.form.isWork = false
        }else{
          this.form.isWork = Boolean(data.value)
        }
      }else{
        this.form[data.name] = data.value
      }
    },
    handleSubmit(){
          if(
          this.form.created_at === '' ||
          this.form.title === '' ||
          this.form.description === '' ||
          this.form.trainerName === '' ||
          this.form.trainerPicture === '' ||
          this.form.trainerTitle === ''||
          this.form.batch === '' ||
          this.form.startDate === '' ||
          this.form.endDate === '' ||
          this.form.price === 0 ||
          this.form.location === '' ||
          typeof this.form.isWork !== 'boolean'  
          ){
            Swal.fire('Please fill all the input', '', 'info')    
          }
          this.$emit('on-confirm', this.form)
    },
    async getDetail(id : number){
      await this.getDetailMinicamp({$axios:this.$axios, id})
      this.form = this.detailMinicamp.data.data
    },
    editCourse(data : IDataMinicamp) {
        this.editAction({$axios: this.$axios, data}).then((_res : any)=>{
          Swal.fire('Edit Success!', '', 'success')
          setTimeout(() => {
            this.$router.push('/minicamp')
          }, 1500);
        }).catch((err : any) => {
          Swal.fire('Edit Failed!', err.message, 'error')    
        })
      },
    ...mapActions({
      getDetailMinicamp : "minicamp/getDetailMinicamp",
      editAction : "minicamp/updateDataMinicamp"
    })
  },
})
</script>
