<template>
  <button
    type="button"
    class="p-xs rounded-s shadow-xs bg-elevated text-primary-role focus-ring border border-role flex items-center gap-xs"
    :aria-label="`Activate ${nextThemeLabel} mode`"
    @click="toggle"
  >
  <IconMoon v-if="current==='dark'" aria-hidden="true" class="w-5 h-5" />
  <IconSun v-else aria-hidden="true" class="w-5 h-5" />
    <span class="text-h5-medium">{{ current==='dark' ? 'Dark' : 'Light' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { IconSun, IconMoon } from '@tabler/icons-vue';

const current = ref<'dark' | 'light'>('dark');

function setTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch(e) { /* ignore */ }
  current.value = theme;
}

function toggle(): void {
  setTheme(current.value === 'dark' ? 'light' : 'dark');
}

onMounted(() => {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') current.value = attr; else current.value = 'dark';
  // enable smooth transitions after initial paint
  requestAnimationFrame(() => document.documentElement.classList.add('theme-ready'));
});

const nextThemeLabel = computed<'light' | 'dark'>(() => current.value === 'dark' ? 'light' : 'dark');
</script>

<style scoped>
/* Optional: minimal transition only after theme-ready */
:global(.theme-ready) body, :global(.theme-ready) .bg-app, :global(.theme-ready) .bg-surface, :global(.theme-ready) .bg-elevated, :global(.theme-ready) .text-primary-role, :global(.theme-ready) .text-secondary-role {
  transition: background-color .25s ease, color .25s ease, border-color .25s ease;
}
</style>
