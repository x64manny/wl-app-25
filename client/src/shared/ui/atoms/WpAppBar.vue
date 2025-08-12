<template>
  <header class="w-full flex items-center justify-between px-md h-appbar bg-surface shadow-sm border-b border-role">
    <slot name="left">
      <h1 class="text-h5-bold m-0">WeightPoint</h1>
    </slot>
    <div class="flex items-center gap-sm">
      <slot />
    </div>
  </header>
</template>
<script setup>
// Atom.
</script>
<style scoped></style>
