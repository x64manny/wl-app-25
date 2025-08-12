<template>
  <main class="bg-app text-primary-role">
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
</style>
