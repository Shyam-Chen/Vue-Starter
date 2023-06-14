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
  <div class="flex -space-x-2">
    <slot></slot>

    <div
      class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
    >
      +{{ totalRef - remaining }}
    </div>
  </div>
</template>
