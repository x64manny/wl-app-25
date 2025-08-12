<template>
  <div class="min-h-screen flex flex-col bg-app text-primary-role">
    <header class="w-full flex items-center justify-end px-md h-appbar bg-surface shadow-sm border-b border-role">
      <ThemeSwitch />
    </header>
    <main class="flex-1" :class="layoutClass">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ThemeSwitch from './shared/ui/atoms/ThemeSwitch.vue';

const screenWidth = ref<number>(window.innerWidth);
function onResize(): void { screenWidth.value = window.innerWidth; }
window.addEventListener('resize', onResize);
onMounted(() => {
  const attr = document.documentElement.getAttribute('data-theme');
  if(!attr) document.documentElement.setAttribute('data-theme', 'dark');
  requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'));
});

const layoutClass = computed<string>(() => screenWidth.value >= 840 ? 'grid grid-cols-2 gap-lg px-lg' : 'px-md');
</script>

<style scoped>
main { max-width: 1200px; margin: 0 auto; width: 100%; }
</style>
