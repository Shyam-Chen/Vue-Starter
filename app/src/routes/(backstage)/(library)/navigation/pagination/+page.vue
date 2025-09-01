<script lang="ts" setup>
import { XBreadcrumb, XCard, XPagination } from '@x/ui';
import { ref } from 'vue';

const page = ref(1);
const page2 = ref(1);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Pagination' }]" />

  <h1 class="text-4xl font-extrabold my-4">Pagination</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="grid gap-6">
        <div class="flex flex-col gap-2">
          <div class="text-sm">Page = {{ page }}, Rows per page = 10, Count = 65,536</div>
          <XPagination v-model:value="page" :rows="10" :count="65_536" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="text-sm">Page = {{ page2 }}, Rows per page = 10, Count = 32</div>
          <XPagination v-model:value="page2" :rows="10" :count="32" />
        </div>
      </div>
    </XCard>
  </section>
</template>
