<script lang="ts" setup>
import type { Node } from '@vue-flow/core';

defineOptions({
  name: 'BlankCard',
  inheritAttrs: false,
});

defineProps<{
  data?: Node['data'];
  selected?: Node['selectable'];
}>();
</script>

<template>
  <div
    class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow"
    :class="{ '!border-primary-500 !dark:border-primary-400': selected }"
  >
    {{ data.label }}
  </div>
</template>
