<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Autocomplete from '~/components/Autocomplete.vue';
import Multiautocomplete from '~/components/Multiautocomplete.vue';

const flux = reactive({
  autocomplete: 'sc',
  multiautocomplete: ['Vue', 'Fastify', 'TypeScript'],
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Autocomplete' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Autocomplete</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Autocomplete v-model:value="flux.autocomplete" />
    </div>

    <pre>{{ flux.autocomplete }}</pre>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Multiple</div>

    <div class="flex justify-center">
      <Multiautocomplete v-model:value="flux.multiautocomplete" />
    </div>

    <pre>{{ flux.multiautocomplete }}</pre>
  </div>
</template>
