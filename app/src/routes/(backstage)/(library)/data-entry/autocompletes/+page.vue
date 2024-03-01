<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XAutocomplete, XMultiautocomplete } from '@x/ui';

const flux = reactive({
  autocomplete: 'sc',
  multiautocomplete: ['Vue', 'Fastify', 'TypeScript'],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Autocomplete' }]" />

  <h1 class="text-4xl font-extrabold my-4">Autocomplete</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XAutocomplete v-model:value="flux.autocomplete" />
      <div class="mt-1">{{ flux.autocomplete }}</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Multiautocomplete</h2>

    <XCard>
      <XMultiautocomplete v-model:value="flux.multiautocomplete" />
      <div class="mt-1">{{ flux.multiautocomplete }}</div>
    </XCard>
  </section>
</template>
