<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XIterator, XTextField } from '@x/ui';

interface Iterator1 {
  address?: string;
}

interface Iterator2 {
  serviceName?: string;
  cloudName?: string;
}

const flux = reactive({
  iterator1: [] as Iterator1[],
  iterator2: [] as Iterator2[],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Iterator' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Iterator</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <XIterator v-model:value="flux.iterator1">
        <template #default="{ item }: { item: Iterator1 }">
          <XTextField v-model:value="item.address" />
        </template>
      </XIterator>
    </div>

    <pre>{{ flux.iterator1 }}</pre>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <XIterator v-model:value="flux.iterator2">
        <template #default="{ item }: { item: Iterator2 }">
          <div class="whitespace-nowrap">Deploy a</div>
          <XTextField v-model:value="item.serviceName" :errorMessage="'Error Message'" />
          <div class="whitespace-nowrap">service to</div>
          <XTextField v-model:value="item.cloudName" />
        </template>
      </XIterator>
    </div>

    <pre>{{ flux.iterator2 }}</pre>
  </div>
</template>
