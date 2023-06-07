<template lang="">
  <div class="w-full flex justify-center">
    <div class="container flex justify-center">
      <div
        class="w-full border-[1px] p-4 sm:p-12 lg:p-20 rounded-md my-12 max-w-2xl"
      >
        <div class="w-full flex flex-col items-center">
          <LogoFazz class="mb-3" />
          <p class="text-2xl font-semibold mb-2">Selamat Datang</p>
          <p class="text-normal mb-3">
            Belum punya akun Fazzrack?
            <span
              class="text-[#ef6807] font-bold cursor-pointer"
              @click="moveLogin"
              >Daftar disini</span
            >
          </p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="w-full">
            <div class="w-full mb-4">
              <InputComponent
                type="email"
                label="Email"
                name="email"
                placeholder="Masukan Email"
                @on-change="handleInput"
              />
            </div>
            <div class="w-full mb-4">
              <InputComponent
                type="password"
                label="password"
                name="password"
                placeholder="Masukan Kata Sandi"
                @on-change="handleInput"
              />
            </div>
          </div>
          <div class="w-full flex justify-between items-center mb-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <InputComponent
                  type="checkbox"
                  checked="checked"
                  class="checkbox-xs mr-5 w-3"
                />
                <span class="label-text">Ingat akun saya</span>
              </label>
            </div>
            <div>
              <p class="text-[#2557a7] font-bold">Lupa Password?</p>
            </div>
          </div>
          <BtnPrimary size="btn-sm" title="masuk" />
        </form>
        <p class="w-full text-center my-4">atau masuk menggunakan</p>
        <BtnGoogle title="google" />
      </div>
      <ToastSuccess v-if="toastStatus" title="Succes Login" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
import BtnGoogle from '~/components/atoms/BtnGoogle.vue'
import LogoFazz from '~/components/atoms/LogoFazz.vue'
import BtnPrimary from '~/components/atoms/BtnPrimary.vue'
import InputComponent from '~/components/atoms/InputComponent.vue'
import ToastSuccess from '~/components/atoms/ToastSuccess.vue'

interface IForm {
  email: string
  password: String
}
interface Data {
  form: IForm
  toastStatus: boolean
}

export default defineComponent({
  components: {
    InputComponent,
    BtnPrimary,
    BtnGoogle,
    LogoFazz,
    ToastSuccess,
  },
  data(): Data {
    return {
      form: {
        email: '',
        password: '',
      },
      toastStatus: false,
    }
  },
  methods: {
    ...mapActions({
      loginAction: 'auth/login',
    }),
    handleInput(data: any) {
      if (data.name === 'email') {
        this.form.email = data.value
      } else {
        this.form.password = data.value
      }
    },
    async handleLogin() {
      if (this.form.email === '' || this.form.password === '') {
        return Swal.fire('Please fill all the input', '', 'warning')
      } else {
        try {
          const auth = await this.$auth.loginWith('local', {
            data: this.form,
          })
          if (auth) {
            Swal.fire('Success Sign In', '', 'success')
            setTimeout(() => {
              window.location.href = '/'
            }, 2000)
          }
        } catch (error) {
          Swal.fire('Email or Password Wrong', '', 'error')
          setTimeout(() => {
            return window.location.reload()
          }, 2000)
        }
      }
    },
    moveLogin() {
      this.$router.push('/register')
    },
  },
})
</script>
