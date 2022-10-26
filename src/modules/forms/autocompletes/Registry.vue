<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Autocomplete from '~/components/Autocomplete.vue';

const flux = reactive({
  autocomplete: 'sc',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Forms', disabled: true },
      { text: 'Autocompletes', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Autocompletes</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Autocomplete v-model:value="flux.autocomplete" />
    </div>
  </div>
</template>
