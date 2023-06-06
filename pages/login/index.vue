<template>
    <div>
        <button class="btn bg-primary-orange">Button</button>
        {{listVidio}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
    computed:{
        ...mapGetters({
            listVidio:'vidio/getList'
        })
    },
    methods:{
        ...mapActions({
            fetchVidio:'vidio/getListVidios'
        })
    },
    // eslint-disable-next-line vue/order-in-components
    mounted(){
        this.fetchVidio()
    }
})
</script>
<style>
    
</style>