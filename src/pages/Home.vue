<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
import Carousel from "../components/Carousel.vue";
import CTA from "../components/CTA.vue";

const info = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8000/api/info", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    info.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Navbar />
  <Hero />

  <div class="section min-h-[60vh] px-8 py-24 bg-gray-900">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
      
      <div class="text-center md:text-left">
        <h1 class="mb-4 text-4xl font-bold text-white"><span class="font-semibold">haventwined</span> Overview</h1>
        
        <p v-if="loading" class="text-lg text-gray-400">Loading...</p>
        <p v-else-if="error" class="text-lg text-red-500">{{ error }}</p>
        <p v-else class="mb-8 text-lg text-gray-300">
          {{ info?.description || "Fetching company details..." }}
        </p>
      </div>

      <div class="flex justify-center">
        <Carousel  v-if="!loading && !error" />
      </div>

    </div>

    <!-- <div class="cta-wrap min-h-[50vh] flex justify-center items-center">
      <div class="mt-20 py-16 flex justify-center items-center flex-col bg-blue-600 text-white text-center rounded-lg shadow-lg max-w-4xl mx-auto px-8">
        <h2 class="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
        <p class="text-lg mb-6">Gabung dengan kami hari ini dan tingkatkan bisnis Anda dengan solusi inovatif kami</p>
  
        <RouterLink
          to="/contact"
          class="inline-block px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </RouterLink>
      </div>
    </div> -->


  </div>


  <CTA description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias explicabo quas neque distinctio laborum at harum nihil necessitatibus!" />

  <Footer v-if="!loading && !error" :phone="info?.phone" :email="info?.email" />
</template>



