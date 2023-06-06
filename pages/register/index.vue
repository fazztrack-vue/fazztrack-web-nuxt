<template lang="">
    <div class="w-full flex justify-center">
        <div class="container flex justify-center ">
            <form action="" class="w-full border-[1px] p-4 sm:p-12 lg:p-20 rounded-md my-12 max-w-2xl" @submit.prevent="handleRegister">
                <div class="w-full flex flex-col items-center">
                    <LogoFazz class="mb-3" />
                    <p class="text-2xl font-semibold mb-2">Daftar dan Mulai Belajar</p>
                    <p class="text-normal mb-3">Sudah punya akun Fazzrack?
                        <span  class="text-[#ef6807] cursor-pointer" @click="moveRegiter">Masuk disini</span>
                    </p>
                </div>
                <div class="w-full">
                    <div class="w-full mb-4">
                        <InputComponent
                            type="text"
                            label="Nama Lengkap"
                            name="fullname"
                            placeholder="Masukan nama lengkap..."
                            @on-change="handleInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type="email"
                            label="Email"
                            name="email"
                            placeholder="Masukan Email..."
                            @on-change="handleInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type="text"
                            label="No. Handphone"
                            name="handphone"
                            placeholder="Masukan No. handphone..."
                            @on-change="handleInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type='password'
                            label='Kata Sandi'
                            name='password'
                            placeholder='Masukan Kata Sandi...'
                            @on-change="handleInput"/>
                    </div>
                    <div class="w-full mb-4">
                        <InputComponent
                            type='password'
                            label='Kata Sandi'
                            name='passwordConfirm'
                            placeholder='Masukan ulang Kata Sandi...'
                            @on-change="handleInput"/>
                    </div>
                </div>
                <div class="w-full flex items-center my-6">
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <inputComponent type="checkbox" checked="checked" class="checkbox-xs mr-5 w-3"/>
                            <span class="label-text">saya menyetujui</span>
                        </label>
                    </div>
                    <div>
                        <p class="text-[#2557a7] font-bold">Syarat dan Ketentuan</p>
                    </div>
                </div>
                <BtnPrimary title="Daftar Fazztrack"/>
            </form>
        </div>
    </div>
</template>
<script lang='ts'>
    import {defineComponent} from 'vue';
    import Swal from 'sweetalert2'
    import {mapActions} from 'vuex'
    import LogoFazz from '~/components/atoms/LogoFazz.vue';
    import BtnPrimary from '~/components/atoms/BtnPrimary.vue';
    import InputComponent from '~/components/atoms/InputComponent.vue';
    
        interface IForm {
            email: string,
            password: String,
        }

    interface Data {
        passwordConfirm : string
        form: IForm
    }

    export default defineComponent({
        components: {
            InputComponent,
            BtnPrimary,
            LogoFazz
        },
        data(): Data {
            return {
                passwordConfirm: "",
                form: {
                    email: "",
                    password: "",
                }
            }
        },
        methods: {
            ...mapActions({
                registerAction:'auth/register'
            }),
            handleInput(data : any) {
                if (data.name === "email") {
                    this.form.email = data.value
                } else if(data.name === "password") {
                    this.form.password = data.value
                } else{
                    this.passwordConfirm = data.value
                }
            },
            handleRegister(){
                if(this.form.email === '' || this.form.password === ''){
                    return Swal.fire('Please fill all the input', '', 'warning')
                }else if(this.passwordConfirm !== this.form.password){
                    return Swal.fire('Password Not Match', '', 'warning')
                }else{
                    this.registerAction(this.form)
                    .then((_res:any)=>{
                        Swal.fire('Register is Success,', 'dimohon untuk login ulang', 'success')
                        setTimeout(() => {
                            return this.$router.push('/login')
                        }, 2000);
                    }).catch((_err:any) => {
                        Swal.fire('Internal Server Error', '', 'error')
                        setTimeout(() => {
                            return window.location.reload()
                        }, 2000);
                    })
                }
            },
            moveRegiter(){
                this.$router.push("/login")
            }
        }
    })
</script>