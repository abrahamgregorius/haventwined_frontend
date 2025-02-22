<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../../../components/Dashboard/Navbar.vue";
import Sidebar from "../../../components/Dashboard/Sidebar.vue";
import { useRouter } from "vue-router";

const data = ref(null);
const loading = ref(true);
const error = ref(null);

const name = ref("");
const asset = ref(null);
const successMessage = ref("");
const router = useRouter()

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8000/api/info", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    data.value = await res.json();
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

// Handle form submission
const submitForm = async () => {
  if (!name.value || !asset.value) {
    alert("Please fill in all fields!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("asset", asset.value);

  try {
    const response = await fetch("http://localhost:8000/api/banner", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Accept": "application/json"
      },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to create banner");

    successMessage.value = "Banner created successfully!";
    name.value = "";
    asset.value = null;
    router.push("/admin/banner")
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
    <div v-if="successMessage" class="p-4 mb-4 text-green-700 bg-green-100 rounded">
      {{ successMessage }}
    </div>

    <form @submit.prevent="submitForm" class="max-w-full">
      <h1 class="mb-4 text-2xl font-semibold">Create New Banner</h1>
      
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
        <label for="asset" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Asset
        </label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="asset"
          type="file"
          @change="handleFileChange"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
    </form>
  </div>
</template>
