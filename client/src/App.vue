<template>
  <div class="min-h-screen flex flex-col bg-app text-primary-role">
    <WpAppBar>
      <template #default>
        <ThemeSwitch />
      </template>
    </WpAppBar>
    <main class="flex-1 pb-16" :class="layoutClass">
      <router-view />
    </main>
    <WpBottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ThemeSwitch from './shared/ui/atoms/ThemeSwitch.vue';
import WpAppBar from './shared/ui/atoms/WpAppBar.vue';
import WpBottomNav from './shared/ui/atoms/WpBottomNav.vue';

const screenWidth = ref(window.innerWidth);
function onResize(){ screenWidth.value = window.innerWidth; }
window.addEventListener('resize', onResize);
onMounted(() => {
  const attr = document.documentElement.getAttribute('data-theme');
  if(!attr) document.documentElement.setAttribute('data-theme', 'dark');
  requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'));
});

const layoutClass = computed(() => screenWidth.value >= 840 ? 'grid grid-cols-2 gap-lg px-lg' : 'px-md');
</script>

<style scoped>
main { max-width: 1200px; margin: 0 auto; width: 100%; }
</style>
