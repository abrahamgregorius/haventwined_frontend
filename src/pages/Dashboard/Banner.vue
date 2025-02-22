<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../../components/Dashboard/Navbar.vue";
import Sidebar from "../../components/Dashboard/Sidebar.vue";

const data = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8000/api/banner", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    const resjson = await res.json()
    data.value = resjson.banners
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Navbar />
  <Sidebar />

  <div
    class="mt-15 sm:ml-64 min-h-[95vh] sm:mt-14 p-4 bg-white dark:text-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <div v-else class="max-w-full">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Banners</h1>
        <router-link
          to="/admin/banner/create"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          + Create
        </router-link>
      </div>

      <!-- Improved Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in data"
          :key="item.id"
          class="bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#" class="block">
            <img
              :src="item.asset"
              alt="Banner Image"
              class="w-full h-[200px] object-cover object-center rounded-t-xl"
            />
          </a>
          <div class="p-5">
            <h5 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ item.name }}
            </h5>
            <div class="w-full flex justify-end">
              <router-link
                :to="`/admin/banner/${item.id}`"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

