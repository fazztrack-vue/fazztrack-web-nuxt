<template >
  <div  class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 z-40 bg-opacity-75 transition-opacity"></div>
    <div v-if="isReady" class="fixed inset-0 z-50 my-20 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"> 
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all py-5 px-3 sm:my-8 sm:w-full sm:max-w-lg">
          <form class="w-full" @submit.prevent="handleSubmit">
            <div class="w-full mb-4">
                <InputModal
                    type="text"
                    label="Title"
                    name="title"
                    :default-value="dataMinicamp.title"
                    placeholder="Masukan title"
                    @on-change="handleInput"/>
                <InputModal
                    type='text-area'
                    label='Description'
                    :default-value="dataMinicamp.description"
                    name='description'
                    placeholder='Masukan description'
                    @on-change="handleInput"/>
                <InputModal
                    type="text"
                    :default-value="dataMinicamp.trainerName"
                    label="Trainer Names"
                    name="trainer-name"
                    placeholder="Masukan trainer names"
                    @on-change="handleInput"/>   
                <InputModal
                    type="url"
                    label="Picture"
                    :default-value="dataMinicamp.trainerPicture"
                    name="trainer-picture"
                    placeholder="Masukan picture"
                    @on-change="handleInput"/> 
                <InputModal
                    type="text"
                    label="Trainer Title"
                    :default-value="dataMinicamp.trainerTitle"
                    name="trainer-title"
                    placeholder="Masukan trainer title"
                    @on-change="handleInput"/>   
                <InputModal
                    type="text"
                    label="Batch"
                    :default-value="dataMinicamp.batch"
                    name="batch"
                    placeholder="Masukan batch"
                    @on-change="handleInput"/> 
                <InputModal
                    type="text"
                    :default-value="dataMinicamp.location"
                    label="Location"
                    name="location"
                    placeholder="Masukan location"
                    @on-change="handleInput"/>
                <InputModal
                    type="date"
                    :default-value="dataMinicamp.startDate"
                    label="Start Date"
                    name="start-date"
                    placeholder="Masukan start date"
                    @on-change="handleInput"/>  
                <InputModal
                    type="date"
                    :default-value="dataMinicamp.endDate"
                    label="End Date"
                    name="end-date"
                    placeholder="Masukan end date"
                    @on-change="handleInput"/>  
                <!-- <InputModal
                    type="text"
                    :default-value="dataMinicamp.isWork"
                    label="Is Work"
                    name="is-work"
                    placeholder="Masukan false or true"
                    @on-change="handleInput"/> -->
                <!-- <InputModal
                    type="number"
                    :default-value="dataMinicamp.price"
                    label="Price"
                    name="price"
                    placeholder="Masukan price"
                    @on-change="handleInput"/>  -->
            </div>
            <BtnPrimary size="btn-sm" title="save"/>
          </form>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="handlecConfirm('cancel')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters, mapActions } from 'vuex';
  import InputModal from '../atoms/InputComponent.vue';
  import BtnPrimary from '../atoms/BtnPrimary.vue';
  import IDataMinicamp from '~/interface/IMinicamp';
  
  interface Data {
    isReady : boolean
    dataMinicamp: IDataMinicamp
  }

  export default {
      components :{
        InputModal,
        BtnPrimary,
      },
      props: {
        id:{
          type: Number,
          required:true
        }
      },
      data() : Data{
        return{
          isReady : false,
          dataMinicamp: {
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
      mounted(){
        this.getDetail(this.id)
      },
      methods:{
        handlecConfirm(val : string){
          this.$emit('on-confirm', val)
        },  
        handleInput(val : any){
          this.dataMinicamp.created_at = new Date().toISOString()
          if(val.name === 'title'){
            this.dataMinicamp.title = val.value
          }
          if(val.name === 'description'){
            this.dataMinicamp.description = val.value
          }
          if(val.name === 'trainer-name'){
            this.dataMinicamp.trainerName = val.value
          }
          if(val.name === 'trainer-picture'){
            this.dataMinicamp.trainerPicture = val.value
          }
          if(val.name === 'trainer-title'){
            this.dataMinicamp.trainerTitle = val.value
          }
          if(val.name === 'batch'){
            this.dataMinicamp.batch = val.value
          }
          if(val.name === 'location'){
            this.dataMinicamp.location = val.value
          }
          if(val.name === 'start-date'){
            this.dataMinicamp.startDate = val.value
          }
          if(val.name === 'end-date'){
            this.dataMinicamp.endDate = val.value
          }
          if(val.name === 'is-work'){
            if(val.value === 'false'){
              this.dataMinicamp.isWork = false
            }else{
              this.dataMinicamp.isWork = Boolean(val.value)
            }
          }
          if(val.name === 'price'){
            this.dataMinicamp.price = val.value
          }
        },
        handleSubmit(){
          if(
          this.dataMinicamp.created_at === '' ||
          this.dataMinicamp.title === '' ||
          this.dataMinicamp.description === '' ||
          this.dataMinicamp.trainerName === '' ||
          this.dataMinicamp.trainerPicture === '' ||
          this.dataMinicamp.trainerTitle === ''||
          this.dataMinicamp.batch === '' ||
          this.dataMinicamp.startDate === '' ||
          this.dataMinicamp.endDate === '' ||
          this.dataMinicamp.price === 0 ||
          this.dataMinicamp.location === '' ||
          typeof this.dataMinicamp.isWork !== 'boolean'  
          ){
            alert('Please fill all the input')
          }
          this.$emit('on-confirm', this.dataMinicamp)
        },
        async getDetail(id :number){
          await this.getDetailMinicamp(id)
          this.dataMinicamp = this.detailMinicamp.data.data
          this.isReady = true
        },
        ...mapActions({
          getDetailMinicamp : "minicamp/getDetailMinicamp"
        })
      },
  }
</script>
<style lang="">
  
</style>