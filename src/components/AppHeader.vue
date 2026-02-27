<template>
  <!-- Header sticky dengan backdrop blur, konsisten dengan HomeView -->
  <header
    class="sticky top-0 z-50 backdrop-blur bg-black/80 h-16 border-b border-gray-700 p-4 transition-all duration-500">
    <div class="h-full w-full max-w-7xl mx-auto flex justify-between items-center text-white gap-4">
      
      <!-- Logo / Home link -->
      <RouterLink to="/" class="text-xl font-bold shrink-0 hover:opacity-75 transition-opacity">
        LARUS TEAM
      </RouterLink>

      <!-- Tombol Support -->
      <a
        href="https://trakteer.id/larus-team/tip?open=true"
        target="_blank"
        class="text-white font-bold hover:underline border-2 border-white uppercase px-2 py-1 shrink-0">
        Support
      </a>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
