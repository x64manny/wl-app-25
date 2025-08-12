<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-surface border-t border-role shadow-sm flex justify-around py-xs" aria-label="Bottom navigation">
    <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="flex flex-col items-center gap-2 px-sm py-1 text-label-medium" :class="linkClass(item.to)">
      <component :is="item.icon" class="w-6 h-6" aria-hidden="true" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>
<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { IconHome, IconListDetails, IconTimeline } from '@tabler/icons-vue';

useRoute();
const route = useRoute();
const items = [
  { to: '/dashboard', label: 'Dashboard', icon: IconHome },
  { to: '/log', label: 'Historial', icon: IconListDetails },
  { to: '/projection', label: 'Proyección', icon: IconTimeline }
];
function linkClass(path) { return route.path === path ? 'text-primary-role font-semibold' : 'text-secondary-role'; }
</script>
<style scoped>
nav { height: var(--app-bottom-nav-height, 56px); }
</style>
