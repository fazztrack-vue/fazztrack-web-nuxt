<template lang="">
    <div class="w-full flex justify-center">
        <div class="container flex justify-center ">
            <form action="" class="w-full border-[1px] p-4 sm:p-12 lg:p-20 rounded-md my-12 max-w-2xl" @submit.prevent="handlePostVidio">
                <div class="w-full flex flex-col items-center">
                    <div>
                        <LogoFazz/>
                    </div>
                    <p class="text-xl font-semibold mb-2">Tambah Data Vidio</p>
                </div>
                <div class="w-full">
                    <div class="w-full mb-4">
                        <InputComponent
                            type="text"
                            label="Judul Vidio"
                            name="title"
                            placeholder="Masukan judul vidio..."
                            @on-change="hnaldeInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type="text"
                            label="deskripsi"
                            name="description"
                            placeholder="Masukan Deskripsi..."
                            @on-change="hnaldeInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type="text"
                            label="URL Cover Vidio"
                            name="cover"
                            placeholder="Masukan url cover vidio..."
                            @on-change="hnaldeInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type='number'
                            label='Ratting'
                            name='ratting'
                            placeholder='Masukan ratting Vidio...'
                            @on-change="hnaldeInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type='text'
                            label='Level'
                            name='level'
                            placeholder='Masukan level vidio...'
                            @on-change="hnaldeInput"/>
                    </div>
                    <div class="w-full mb-10">
                        <InputComponent
                            type='number'
                            label='Harga'
                            name='harga'
                            placeholder='Masukan harga vidio...'
                            @on-change="hnaldeInput"/>
                    </div>
                </div>
                <BtnPrimary title="Tambah Vidio"/>
            </form>
        </div>
    </div>
</template>
<script lang='ts'>
    import {defineComponent} from 'vue';
    import {mapActions} from "vuex"
    import InputComponent from '@/components/atoms/InputComponent.vue'
    import BtnPrimary from '~/components/atoms/BtnPrimary.vue';
    import LogoFazz from '~/components/atoms/LogoFazz.vue';

    
    interface IForm {
        title: string;
        description: string;
        cover: string;
        rating: number;
        level: string;
        price: number;
    }
    
    interface Data {
        form: IForm
    }
    export default defineComponent({
        components: {
            InputComponent,
            BtnPrimary,
            LogoFazz,
        },
        layout: 'NavFoot',
        data(): Data {
            return {
                form: {
                    title: 'string',
                    description: 'string',
                    cover: 'string',
                    rating: 0,
                    level: 'string',
                    price: 0,
                }
            }
        },
        methods: {
            ...mapActions({
                postVidio:'vidio/postVidio'
            }),
            hnaldeInput(data : any) {
                if (data.name === 'title') {
                    this.form.title = data.value
                } else if (data.name === 'description'){
                    this.form.description = data.value
                }else if (data.name === 'cover'){
                    this.form.cover = data.value
                }else if (data.name === 'rating'){
                    this.form.rating = data.value
                }else if (data.name === 'level'){
                    this.form.level = data.value
                }
                else {
                    this.form.price = data.value
                }                
            },
            handlePostVidio(){
            this.postVidio(this.form).then((_res:any)=>{
                this.$router.push('/onlineCourse') 
            })
            }
        }
    })
</script>