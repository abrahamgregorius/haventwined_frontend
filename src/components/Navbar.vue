<script setup>
  const token = localStorage.getItem('token')

</script>

<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <router-link
        to="/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src="../assets/logo.png"
          class="h-8"
          alt="Flowbite Logo"
        />
      </router-link>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <router-link v-if="!token" to="/login">
          <button
            type="button"
            class="text-white cursor-pointer bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </router-link>
        <router-link v-else to="/admin">
          <button
            type="button"
            class="text-white cursor-pointer bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
          >
            Dashboard
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>
