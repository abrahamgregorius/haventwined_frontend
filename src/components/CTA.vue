<script setup>
defineProps({
    description: String
})
</script>

<template>
    <section className="w-full cursor-pointer py-24 lg:py-32 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Penasaran tentang kami? <br>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Hubungi kami
            </span>
          </h2>

          <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-12">
            {{ description }}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              className="w-full cursor-pointer rounded h-14 text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Hubungi Kami
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              className="w-full cursor-pointer rounded h-14 text-base font-semibold border-gray-700 text-white hover:bg-gray-800 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>

        </div>
      </div>
    </section>
</template>