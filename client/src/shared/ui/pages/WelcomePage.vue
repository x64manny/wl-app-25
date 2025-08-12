<script setup>
import WpButton from '../atoms/WpButton.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function goDash(){ router.push('/dashboard'); }
</script>

<template>
  <div class="p-md">
    <h2 class="text-h7 mb-md">Bienvenido</h2>
    <p class="text-h4 mb-lg">Onboarding pendiente (placeholder).</p>
  </div>
</template>

