<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Spinner from '~/components/Spinner.vue';

const flux = reactive({
  launch() {
    flux.dialog = true;
  },
  dialog: false,
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Progress', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Progress</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Spinner class="w-8 h-8 border-4" />
  </div>
</template>
