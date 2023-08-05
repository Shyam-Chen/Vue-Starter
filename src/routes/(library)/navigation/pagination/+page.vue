<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Pagination from '~/components/Pagination.vue';
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Pagination', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Pagination</div>
  </div>

  <div class="border grid gap-4 p-4 my-4">
    <div class="font-bold">Basic</div>

    <div class="flex flex-col gap-2">
      <div class="text-sm">Page = 1, Rows per page = 10, Count = 144</div>
      <Pagination :value="1" :rows="10" :count="144" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-sm">Page = 1, Rows per page = 10, Count = 27</div>
      <Pagination :value="1" :rows="10" :count="27" />
    </div>
  </div>
</template>
