<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Skeleton from '~/components/Skeleton.vue';

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
      { text: 'Skeletons', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Skeletons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <Skeleton />
  </div>
</template>
