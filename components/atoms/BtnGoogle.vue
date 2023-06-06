<template lang="">
    <div>
        <button class="w-full flex justify-center items-center py-1 rounded-md font-semibold border border-[#6c757d]  hover:text-black" @click="onClick">
            <img class="w-5 h-5 mr-2"  src="https://sso.fazztrack.com/auth/resources/5cc92/login/fazztrack-v2/icon/google.svg" alt="">
            {{title}}
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props:{
        title:{
            type:String,
            required: true
        }
    },
    methods: {
        onClick(){
            this.$emit('event', "")
        }
    },
})
</script>
<style>
    
</style>