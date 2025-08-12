<template>
  <main class="app">
    <Logo />
    <h1>{{ title }}</h1>
    <p>Edit <code>src/App.vue</code> and save to test HMR.</p>
  </main>
</template>

<script>
import Logo from './components/Logo.vue';

export default {
  name: 'App',
  components: { Logo },
  data() {
    return { title: 'Hello Vue 3 + Vite' };
  },
};
</script>

<style>
body { margin: 0; font-family: system-ui, Avenir, Helvetica, Arial, sans-serif; }
.app { padding: 2rem; text-align: center; }
</style>
