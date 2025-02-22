<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../../../components/Dashboard/Navbar.vue";
import Sidebar from "../../../components/Dashboard/Sidebar.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const data = ref(null);
const loading = ref(true);
const error = ref(null);
const name = ref("");
const asset = ref(null);
const successMessage = ref("");

onMounted(async () => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/banner/${route.params.id}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const json = await res.json();
    data.value = json;
    name.value = json.name;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// Handle file selection
const handleFileChange = (event) => {
  asset.value = event.target.files[0];
};

const updateBanner = async () => {
  if (!name.value) {
    alert("Name is required!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("_method", "PUT");
  if (asset.value) formData.append("asset", asset.value);

  try {
    const response = await fetch(
      `http://localhost:8000/api/banner/${route.params.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Failed to update banner");

    router.push("/admin/banner"); 
    successMessage.value = "Banner updated successfully!";
  } catch (err) {
    error.value = err.message;
  }
};


const deleteBanner = async () => {
  if (!confirm("Are you sure you want to delete this banner?")) return;

  try {
    const response = await fetch(
      `http://localhost:8000/api/banner/${route.params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete banner");

    router.push("/admin/banner"); 
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <Navbar />
  <Sidebar />

  <div
    class="mt-15 sm:ml-64 min-h-[93vh] sm:mt-14 p-4 bg-white dark:text-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <form v-else @submit.prevent="updateBanner" class="max-w-full">
      <router-link
        to="/admin/banner"
        class="flex flex-row items-center gap-2 underline"
      >
        < Back
      </router-link>
      
      <div
        v-if="successMessage"
        class="my-4 p-2 bg-green-200 text-green-800 rounded"
      >
        {{ successMessage }}
      </div>

      <h1 class="mb-4 text-2xl font-semibold">Banner Detail</h1>

      <div class="mb-5">
        <img :src="data.asset || ''" class="h-[15rem]" alt="" />
      </div>

      <div class="mb-5">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the banner name"
          required
        />
      </div>

      <div class="mb-5">
        <label
          for="asset"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Asset
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="asset"
          type="file"
          @change="handleFileChange"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
        <button
          type="button"
          @click="deleteBanner"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Delete
        </button>
      </div>

      
    </form>
  </div>
</template>
