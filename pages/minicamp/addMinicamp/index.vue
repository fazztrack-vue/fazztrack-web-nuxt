<template lang="">
  <div class="w-full flex justify-center">
    <div class="container flex justify-center">
      <form
        class="w-full border-[1px] p-4 sm:p-12 lg:p-20 rounded-md my-12 max-w-2xl"
        @submit.prevent="handleSubmit(form)"
      >
        <div class="w-full flex flex-col items-center">
          <div>
            <LogoFazz />
          </div>
          <p class="text-xl font-semibold mb-2">Tambah Data Minicamp</p>
        </div>
        <div class="w-full mb-4">
                <InputModal
                    type="text"
                    label="Title"
                    name="title"
                    placeholder="Masukan title"
                    @on-change="handleInput"/>
                <InputModal
                    type='text-area'
                    label='Description'
                    name='description'
                    placeholder='Masukan description'
                    @on-change="handleInput"/>
                <InputModal
                    type="text"
                    label="Trainer Names"
                    name="trainerName"
                    placeholder="Masukan trainer names"
                    @on-change="handleInput"/>   
                <InputModal
                    type="url"
                    label="Picture"
                    name="trainerPicture"
                    placeholder="Masukan picture"
                    @on-change="handleInput"/> 
                <InputModal
                    type="text"
                    label="Trainer Title"
                    name="trainerTitle"
                    placeholder="Masukan trainer title"
                    @on-change="handleInput"/>   
                <InputModal
                    type="text"
                    label="Batch"
                    name="batch"
                    placeholder="Masukan batch"
                    @on-change="handleInput"/> 
                <InputModal
                    type="text"
                    label="Location"
                    name="location"
                    placeholder="Masukan location"
                    @on-change="handleInput"/>
                <InputModal
                    type="date"
                    label="Start Date"
                    name="startDate"
                    placeholder="Masukan start date"
                    @on-change="handleInput"/>  
                <InputModal
                    type="date"
                    label="End Date"
                    name="endDate"
                    placeholder="Masukan end date"
                    @on-change="handleInput"/>  
                <InputModal
                    type="text"
                    label="Is Work"
                    name="is-work"
                    placeholder="Masukan false or true"
                    @on-change="handleInput"/>
                <InputModal
                    type="number"
                    label="Price"
                    name="price"
                    placeholder="Masukan price"
                    @on-change="handleInput"/> 
            </div>
        <BtnPrimary title="Tambah Minicamp" />
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

import Swal from 'sweetalert2';
import IDataMinicamp from '~/interfaces/IMinicamp';
import BtnPrimary from '~/components/atoms/BtnPrimary.vue'
import InputModal from '@/components/atoms/InputComponent.vue'
import LogoFazz from '~/components/atoms/LogoFazz.vue';

interface IForm {
[key: string]: string | number | boolean
}

interface Data {
  form: IForm
}

export default defineComponent({
  components: {
    InputModal,
    BtnPrimary,
    LogoFazz
  },
  data() : Data{
        return{
          form: {
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
    handleSubmit(data : IDataMinicamp){
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
      this.insertDataMinicamp({$axios: this.$axios, data}).then((_res : any) => {
        Swal.fire('Success Insert', '' , 'success')
        setTimeout(() => {
          this.$router.push('/minicamp')
        }, 2000);
      }).catch((error : any) => {
        Swal.fire('Insert Failed!', error.message, 'error')    
      })
    },
    ...mapActions({
      insertDataMinicamp : "minicamp/insertDataMinicamp"
    })
  },
})
</script>
