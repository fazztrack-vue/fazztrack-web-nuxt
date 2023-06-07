<template>
  <div>
    <NavbarComponent />
    <div>
      <Nuxt />
    </div>
    <Contact />
    <FooterComponent />
  </div>
</template>
<script lang="ts">
import Contact from '~/components/atoms/ContactComponent.vue';
import NavbarComponent from '~/components/organisms/NavbarComponent.vue';
import FooterComponent from '~/components/organisms/FooterComponent.vue';

export default {
    components: { Contact,FooterComponent,NavbarComponent }
}
</script>
<style lang="">
  
</style>