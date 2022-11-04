<script lang="ts" setup>
import type { PropType } from 'vue';

interface Breadcrumb {
  text: string;
  disabled?: boolean;
  href?: string;
}

const props = defineProps({
  items: {
    type: Array as PropType<Breadcrumb[]>,
    default: () => [],
  },
});
</script>

<template>
  <nav class="rounded-md w-full">
    <ol class="list-reset flex">
      <template v-for="(item, index) in items" :key="item.text">
        <li>
          <span v-if="item.disabled" class="text-gray-500">{{ item.text }}</span>
          <RouterLink v-else :to="item.href" class="text-blue-600 hover:text-blue-700">{{
            item.text
          }}</RouterLink>
        </li>
        <li v-if="index !== items.length - 1">
          <div class="text-gray-500 mx-2 flex items-center h-full">
            <slot name="divider">/</slot>
          </div>
        </li>
      </template>
    </ol>
  </nav>
</template>
