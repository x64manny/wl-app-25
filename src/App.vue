<template>
  <main class="app">
    <h1>{{ title }}</h1>
    <button @click="increment">Clicked {{ count }} times</button>
    <p>Edit <code>src/App.vue</code> and save to test HMR.</p>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const title = 'Hello Vue 3 + Vite (Composition API)';
const count = ref(0);
function increment() {
  count.value += 1;
}
</script>

<style>
body { margin: 0; font-family: system-ui, Avenir, Helvetica, Arial, sans-serif; }
.app { padding: 2rem; text-align: center; }
</style>
