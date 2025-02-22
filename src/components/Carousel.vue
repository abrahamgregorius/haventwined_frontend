<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slides = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8000/api/banner", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch banners");

    const data = await res.json();
    slides.value = data.banners;
    console.log(data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="relative w-full max-w-2xl">
    <p v-if="loading" class="text-center text-gray-500">Loading banners...</p>
    <p v-else-if="error" class="text-center text-red-500">{{ error }}</p>

    <Swiper
      v-else
      :modules="[Navigation, Autoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      navigation
      class="rounded-lg shadow-lg select-none"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id">
        <div class="w-full aspect-[16/9]">
          <img
            :src="slide.asset"
            :alt="'Banner ' + slide.id"
            class="w-full h-full object-cover object-center rounded-lg"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 50%;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>
