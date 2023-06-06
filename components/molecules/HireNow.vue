<template lang="">
  <section class="w-full flex justify-center bg-[#fff3e4] py-14 px-5">
    <section class="container-class">
      <div class="flex flex-col items-center">
        <TitleHire class='text-center' style-text="" :title="titleSection" />
        <div class="mt-5">
            <BtnPrimary :title="btnTitle" />
        </div>
      </div>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TitleHire from '../atoms/TitleHire.vue';
import BtnPrimary from '../atoms/BtnPrimary.vue';


export default defineComponent({
    components:{
        BtnPrimary,
        TitleHire
    },
    props:{
        titleSection:{
            type:String,
            required:true
        },
        btnTitle:{
            type:String,
            required:true
        }
    }
});
</script>
<style lang=""></style>
