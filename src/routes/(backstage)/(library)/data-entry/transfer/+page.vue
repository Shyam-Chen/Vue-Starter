<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Transfer from '~/components/Transfer.vue';

const flux = reactive({
  source: [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Svelte' },
    { id: 4, name: 'Vue' },
  ],
  target: [
    { id: 5, name: 'TypeScript' },
    { id: 6, name: 'JavaScript' },
    { id: 7, name: 'CoffeeScript' },
    { id: 8, name: 'PureScript' },
  ],
});
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Transfer' }]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Transfer</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex flex-col justify-center">
      <Transfer v-model:source="flux.source" v-model:target="flux.target" />
    </div>

    <div class="flex">
      <pre class="flex-1">{{ flux.source }}</pre>
      <div class="w-15"></div>
      <pre class="flex-1">{{ flux.target }}</pre>
    </div>
  </div>
</template>
