<template lang="">
    <section class="w-full py-24 px-5 flex lg:justify-between lg:items-center flex-col-reverse justify-center lg:flex-row">
        <main class="text-center lg:text-start">
          <div>
            <div :class="'flex' + ' ' + reverseContent">
              <p class="lg:text-[48px] text-[32px] font-bold title text-primary-orange">
                {{conten}}
              </p>
              <p class="lg:text-[48px] text-[32px] font-bold title">{{secondConten}}</p>
            </div>
            <p class="lg:text-[20px] text-[16px] text-[#797e86] mt-2">
              {{desc}}
            </p>
          </div>
          <div class="flex justify-center lg:justify-start mt-6">
            <BtnPrimary :title="btnTitle" />
          </div>
        </main>
        <section class="flex justify-center mb-10">
          <img
            :src="`${imgContent}`"
            alt=""
            :class="imgSize" />
        </section>
      </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BtnPrimary from '../atoms/BtnPrimary.vue';

export default defineComponent({
    props:{
        conten:{
            type:String,
            required:true
        },
        secondConten:{
            type:String,
            required:true
        },
        imgContent:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:false,
            default:""
        },
        btnTitle:{
            type:String,
            required:true
        },
        reverseContent:{
          type:String,
          required:false,
          default:"flex-col"
        },
        imgSize:{
          type:String,
          required:true
        }
    },
    components:{
        BtnPrimary
    }
})
</script>
<style lang="">
    
</style>