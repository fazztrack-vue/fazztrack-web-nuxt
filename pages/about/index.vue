<template>
  <div class="w-full flex flex-col items-center">
    <section class="container-class">
      <BannerSection
        img-size="w-full h-full"
        reverse-content="flex-col-reverse"
        conten="Build Life-Changing Education"
        thir-conten="Build Life-Changing Education"
        second-conten="Our Mission Is To"
        desc="Bring more kickass talent to Indonesia’s tech ecosystem."
        img-content="https://www.fazztrack.com/_nuxt/img/about-page-hero.3a699a8.png"
        btn-title="Daftar sekarang"
      />
      <section class="w-full px-5 flex flex-col lg:flex-row items-center mb-16">
        <div class="lg:w-[40%] lg:ml-7 flex flex-col justify-start">
          <TitleHire title="The New Career Hacks" />
          <p class="text-base lg:text-xl text-[#797e86]">
            Di Fazztrack kami percaya ada cara yang lebih baik untuk sukses:
          </p>
        </div>
        <div class="lg:w-[60%]">
          <div class="flex items-start mt-5">
            <i
              class="fa-solid fa-check text-primary-orange fa-lg mt-3 mr-5"
            ></i>
            <p class="text-base text-[#797e86]">
              Menggunakan skema Income Share Agreement (ISA) sehingga tidak ada
              biaya pendidikan di depan.
            </p>
          </div>
          <div class="flex items-start mt-5">
            <i
              class="fa-solid fa-check text-primary-orange fa-lg mt-3 mr-5"
            ></i>
            <p class="text-base text-[#797e86]">
              Memberikan skill yang dibutuhkan sesuai standar industri.
            </p>
          </div>
          <div class="flex items-start mt-5">
            <i
              class="fa-solid fa-check text-primary-orange fa-lg mt-3 mr-5"
            ></i>
            <p class="text-base text-[#797e86]">
              Menyalurkan lulusan Fazztrack ke perusahaan rekanan Fazztrack.
            </p>
          </div>
        </div>
      </section>
    </section>
    <CompaniesSection
      desc="Kami membantu ratusan perusahaan untuk mengembangkan bisnisnya melalui lulusan Fazztrack."
      title="From Startup to Enterprise"
    />
    <section class="w-full flex justify-center my-20">
      <section class="container-class px-5 flex flex-col items-center">
        <div class="mb-8">
          <TitleHire title="Hubungi Fazztrack" />
        </div>
        <div
          class="lg:w-[80%] w-full flex flex-col lg:flex-row justify-center items-center"
        >
          <div class="lg:mr-10 w-full flex justify-center lg:justify-end">
            <iframe
              class="w-full h-[254px] lg:w-[254px] lg:right-5"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=fazztrack&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
            </iframe>
          </div>
          <div class="flex flex-col justify-between h-full mt-10 lg:m-0">
            <h2 class="text-base lg:text-xl font-semibold text-primary-orange">
              Fazztrack Head Office
            </h2>
            <p class="text-[#494c51] text-base lg:text-xll mb-4">
              CIBIS Park, Jl. TB Simatupang No.2, RT.13/RW.5, Cilandak Tim.,
              Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota
              Jakarta 12560
            </p>
            <p class="text-[#494c51] text-base lg:text-xl mb-4">
              Senin - Jumat (08.00 - 18.00)
            </p>
            <div>
              <h2
                class="text-base lg:text-xl font-semibold text-primary-orange"
              >
                Kontak Kami
              </h2>
              <p class="text-[#494c51] text-base lg:text-xl">+6282261564148</p>
            </div>
          </div>
        </div>
      </section>
    </section>
    <HireNow
      btn-title="daftar sekarang"
      title-section="Tunggu Apa Lagi? Gabung Bersama Kami!"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TitleHire from '@/components/atoms/TitleHire.vue'
import HireNow from '@/components/molecules/HireNow.vue'
import CompaniesSection from '@/components/molecules/CompaniesSection.vue'
import BannerSection from '@/components/molecules/BannerSection.vue'
import { ITools } from '@/interfaces/IHire'
import '@/style/global.css'
import {
  QualityDesc,
  backend,
  digitalMarketing,
  fullstack,
  ios,
  qaEngineer,
} from '@/data/hire'

interface IQualityList {
  id: number
  desc: string
}

interface Data {
  tools: {
    title: string
    data: ITools[]
  }[]
  listQualityDesc: IQualityList[]
}
export default defineComponent({
  components: {
    CompaniesSection,
    TitleHire,
    HireNow,
    BannerSection,
  },
  layout: 'NavFoot',
  auth:false,
  data(): Data {
    return {
      tools: [
        {
          title: 'Fullstack Web & Mobile',
          data: fullstack,
        },
        {
          title: 'Backend Developer',
          data: backend,
        },
        {
          title: 'iOS Developer',
          data: ios,
        },
        {
          title: 'QA Automation Engineer',
          data: qaEngineer,
        },
        {
          title: 'Digital Marketing',
          data: digitalMarketing,
        },
      ],
      listQualityDesc: QualityDesc,
    }
  },
  mounted() {},
})
</script>
<style>
.title {
  font-family: 'Sora', sans-serif;
}
</style>
