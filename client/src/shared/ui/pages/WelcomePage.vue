<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function goDash(): void { router.push('/dashboard'); }
</script>

<template>
  <div class="p-md space-y-md">
    <h2 class="text-h7 mb-md">Bienvenido</h2>
    <p class="text-h4 mb-lg">Onboarding pendiente (placeholder).</p>
    <button type="button" class="px-md py-sm rounded-s bg-accent-solid text-on-solid" @click="goDash">Ir al dashboard</button>
  </div>
</template>

