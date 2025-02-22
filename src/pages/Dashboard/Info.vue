<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../../components/Dashboard/Navbar.vue";
import Sidebar from "../../components/Dashboard/Sidebar.vue";

const data = ref({ description: "", email: "", phone: "" });
const loading = ref(true);
const error = ref(null);
const successMessage = ref("");

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8000/api/info", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    data.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// Handle form submission
const submitForm = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming authentication
      },
      body: JSON.stringify({
        description: data.value.description,
        email: data.value.email,
        phone: data.value.phone,
      }),
    });

    if (!response.ok) throw new Error("Failed to submit data");

    successMessage.value = "Company information updated successfully!";
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <Navbar />
  <Sidebar />

  <div class="mt-15 sm:ml-64 min-h-[95vh] sm:mt-14 p-4 bg-white dark:text-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <form v-else @submit.prevent="submitForm" class="max-w-full">
      <div v-if="successMessage" class="my-4 p-2 bg-green-200 text-green-800 rounded">
        {{ successMessage }}
      </div>

      <h1 class="mb-4 text-2xl font-semibold">Company Information</h1>

      <div class="mb-5">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          id="description"
          v-model="data.description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the company description"
          rows="5"
          required
        ></textarea>
      </div>

      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="text"
          id="email"
          v-model="data.email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the company email"
          required
        />
      </div>

      <div class="mb-5">
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          v-model="data.phone"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the company phone number"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update
      </button>

    </form>
  </div>
</template>
