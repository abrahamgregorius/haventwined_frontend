<script setup>
import Navbar from "../components/Dashboard/Navbar.vue";
import Sidebar from "../components/Dashboard/Sidebar.vue";
</script>

<template>
  <Navbar></Navbar>

  <Sidebar></Sidebar>

  <div class="mt-15 sm:ml-64 min-h-[95vh] sm:mt-14 p-4 bg-white dark:text-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex w-full flex-col justify-center min-h-[80vh] items-center">
      <span class="text-2xl text-center font-light">Welcome to the</span>
      <h2 class="text-5xl text-center font-semibold">Administrator Dashboard</h2>
    </div>
  </div>
</template>
