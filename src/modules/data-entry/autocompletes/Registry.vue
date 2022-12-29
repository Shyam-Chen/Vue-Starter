<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Autocomplete from '~/components/Autocomplete.vue';
// import Multiautocomplete from '~/components/Multiautocomplete.vue';
import ChipField from '~/components/ChipField.vue';

const flux = reactive({
  autocomplete: 'sc',
  multiautocomplete: ['Vue', 'Fastify', 'TypeScript'],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Autocompletes', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Autocompletes</div>
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
      <!-- <Multiautocomplete v-model:value="flux.multiautocomplete" /> -->
      <ChipField v-model:value="flux.multiautocomplete" />
    </div>

    <pre>{{ flux.multiautocomplete }}</pre>
  </div>
</template>
