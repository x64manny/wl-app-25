<!-- atoms/WButton.vue -->
<template>
  <button
    type="button"
    class="h-11 px-4 rounded-2xl bg-[var(--color-primary)] text-[var(--color-blanco)]
           hover:opacity-90 active:opacity-80 transition focus:outline-none
           focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
           disabled:opacity-60 disabled:cursor-not-allowed"
    :disabled="loading || disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ loading?: boolean; disabled?: boolean }>();
defineEmits<{ (e: 'click', ev: MouseEvent): void }>();
</script>
