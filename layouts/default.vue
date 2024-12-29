<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <header class="bg-white/70 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 transition-all duration-300 hover:bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center items-center h-16">
          <h1 class="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-105 transition-transform duration-300">
            SAHILXD
          </h1>
        </div>
      </div>
    </header>
    <main class="transition-all duration-300">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
// Default layout script
</script>