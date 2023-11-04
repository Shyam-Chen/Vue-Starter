<script lang="ts" setup>
import { toRef, useSlots } from 'vue';

const props = defineProps<{
  total?: number;
}>();

const slots = useSlots();

const totalRef = toRef(props, 'total', 0);
const remaining = slots?.default?.()?.length || 0;
</script>

<template>
  <div class="avatar-group">
    <slot></slot>

    <div class="avatar-group-total">+{{ totalRef - remaining }}</div>
  </div>
</template>

<style lang="scss" scoped>
.avatar-group {
  @apply flex -space-x-2;
}

.avatar-group-total {
  @apply flex items-center justify-center w-10 h-10 rounded-full;
  @apply text-xs font-medium text-white bg-gray-700 hover:bg-gray-600;
}
</style>
