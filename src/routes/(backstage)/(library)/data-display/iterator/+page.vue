<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XIterator, XTextField, XCode } from '@x/ui';

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
  iterator3: [] as Iterator1[],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Iterator' }]" />

  <h1 class="text-4xl font-extrabold my-4">Iterator</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XIterator v-model:value="flux.iterator1">
        <template #default="{ item }">
          <XTextField v-model:value="item.address" />
        </template>
      </XIterator>

      <pre class="mt-1">{{ flux.iterator1 }}</pre>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Multiple</h2>

    <XCard>
      <XIterator v-model:value="flux.iterator2">
        <template #default="{ item }">
          <div class="whitespace-nowrap">Deploy a</div>
          <XTextField v-model:value="item.serviceName" invalid="Incorrect entry" />
          <div class="whitespace-nowrap">service to</div>
          <XTextField v-model:value="item.cloudName" />
        </template>
      </XIterator>

      <pre class="mt-1">{{ flux.iterator2 }}</pre>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Max Length</h2>

    <XCard>
      <div class="mb-1">Maximum iterator length: <XCode>5</XCode></div>

      <XIterator v-model:value="flux.iterator3" maxlength="5">
        <template #default="{ item }">
          <XTextField v-model:value="item.address" />
        </template>
      </XIterator>
    </XCard>
  </section>
</template>
