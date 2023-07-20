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
          <RouterLink
            v-if="item.href"
            :to="item.href"
            class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >{{ item.text }}</RouterLink
          >
          <span v-else class="text-slate-500">{{ item.text }}</span>
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
