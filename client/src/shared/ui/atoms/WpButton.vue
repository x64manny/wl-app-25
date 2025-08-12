<template>
  <button :type="type" class="inline-flex items-center justify-center gap-xs rounded-s text-label-medium font-medium focus-ring select-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-md h-11" :class="variantClass" v-bind="$attrs">
    <slot />
  </button>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({ variant: { type: String, default: 'primary' }, type: { type: String, default: 'button' } });
const variantClass = computed(() => {
  switch (props.variant) {
    case 'ghost': return 'bg-transparent text-primary-role hover:bg-surface-active';
    case 'danger': return 'bg-danger-solid text-on-solid hover:bg-danger-solid/90';
    default: return 'bg-accent-solid text-on-solid hover:bg-accent-solid/90';
  }
});
</script>
<script>
export default { inheritAttrs: false };
</script>
<style scoped></style>
