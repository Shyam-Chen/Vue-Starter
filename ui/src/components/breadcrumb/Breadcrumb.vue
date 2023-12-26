<script lang="ts" setup>
import Link from '../link/Link.vue';

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
          <Link v-if="item.href" :to="item.href">{{ item.text }}</Link>
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
