<script lang="ts" setup>
import Link from '../link/Link.vue';

interface Breadcrumb {
  icon?: string;
  text: string;
  disabled?: boolean;
  to?: string;
  href?: string;
}

defineProps<{
  items: Breadcrumb[];
}>();
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex flex-wrap items-center">
      <template v-for="(item, index) in items" :key="item.text">
        <li class="inline-flex items-center">
          <Link v-if="item.to || item.href" :to="item.to" :href="item.href" class="inline-flex">
            <div v-if="item.icon" :class="item.icon" class="w-5 h-5 me-1.5"></div>
            {{ item.text }}
          </Link>
          <span v-else class="inline-flex text-sm font-bold text-slate-600 dark:text-slate-400">
            <div v-if="item.icon" :class="item.icon" class="w-5 h-5 me-1.5"></div>
            {{ item.text }}
          </span>
        </li>
        <li v-if="index !== items.length - 1" class="inline-flex items-center">
          <span class="mx-2 text-sm"><slot name="divider">/</slot></span>
        </li>
      </template>
    </ol>
  </nav>
</template>
