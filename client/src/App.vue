<template>
  <main class="app min-h-screen bg-app text-primary-role">
    <div class="flex justify-end mb-m">
      <ThemeSwitch />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ThemeSwitch from './shared/ui/atoms/ThemeSwitch.vue';

const currentTheme = ref('dark');
onMounted(() => {
  currentTheme.value = document.documentElement.getAttribute('data-theme') || 'dark';
  const observer = new MutationObserver(() => {
    currentTheme.value = document.documentElement.getAttribute('data-theme') || 'dark';
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
});
</script>

<style>
html, body, #app, .app { margin: 0; }
</style>
