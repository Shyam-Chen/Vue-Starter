<script lang="ts" setup>
import { XBreadcrumb, XPagination } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Pagination' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Pagination</div>
  </div>

  <div class="border grid gap-4 p-4 my-4">
    <div class="font-bold">Basic</div>

    <div class="flex flex-col gap-2">
      <div class="text-sm">Page = 1, Rows per page = 10, Count = 144</div>
      <XPagination :value="1" :rows="10" :count="144" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-sm">Page = 1, Rows per page = 10, Count = 27</div>
      <XPagination :value="1" :rows="10" :count="27" />
    </div>
  </div>
</template>
