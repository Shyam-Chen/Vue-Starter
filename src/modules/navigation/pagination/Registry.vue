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

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex flex-col gap-2">
      <Pagination />
    </div>
  </div>
</template>
