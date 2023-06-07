<template>
  <div>
    <NavbarComponent widht-contain="profile" />
    <div>
      <Nuxt />
    </div>
    <Contact />
    <FooterProfile />
  </div>
</template>
<script lang="ts">
import Contact from '~/components/atoms/ContactComponent.vue';
import FooterProfile from '~/components/molecules/FooterProfile.vue';
import NavbarComponent from '~/components/organisms/NavbarComponent.vue';

export default {
    components: { Contact, NavbarComponent, FooterProfile }
}
</script>
<style lang="">
  
</style>