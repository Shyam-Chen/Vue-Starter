<script lang="ts" setup>
import { RouterLink } from 'vue-router';

interface Breadcrumb {
  text: string;
  disabled?: boolean;
  href?: string;
}

defineProps<{
  items: Breadcrumb[];
}>();
</script>

<template>
  <nav class="rounded-md w-full">
    <ol class="list-reset flex">
      <template v-for="(item, index) in items" :key="item.text">
        <li>
          <span v-if="item.disabled" class="text-gray-500">{{ item.text }}</span>
          <RouterLink
            v-else
            :to="item.href || ''"
            class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >{{ item.text }}</RouterLink
          >
        </li>
        <li v-if="index !== items.length - 1">
          <div class="mx-2 flex items-center h-full">
            <slot name="divider">/</slot>
          </div>
        </li>
      </template>
    </ol>
  </nav>
</template>
