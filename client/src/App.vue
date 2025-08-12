<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full flex items-center justify-end px-md h-appbar border-b">
    </header>
    <main class="flex-1" :class="layoutClass">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const screenWidth = ref<number>(window.innerWidth);
function onResize(): void { screenWidth.value = window.innerWidth; }
window.addEventListener('resize', onResize);
onMounted(() => { /* theme switch removed */ });

const layoutClass = computed<string>(() => screenWidth.value >= 840 ? 'grid grid-cols-2 gap-lg px-lg' : 'px-md');
</script>

<style scoped>
main { max-width: 1200px; margin: 0 auto; width: 100%; }
</style>
