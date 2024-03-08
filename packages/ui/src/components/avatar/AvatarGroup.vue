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
  <div class="AvatarGroup">
    <slot></slot>

    <div class="AvatarGroup-Total">+{{ totalRef - remaining }}</div>
  </div>
</template>

<style lang="scss" scoped>
.AvatarGroup {
  @apply flex -space-x-2;
}

.AvatarGroup-Total {
  @apply flex items-center justify-center w-10 h-10 rounded-full;
  @apply text-xs font-medium text-white bg-gray-700 hover:bg-gray-600;
}
</style>
