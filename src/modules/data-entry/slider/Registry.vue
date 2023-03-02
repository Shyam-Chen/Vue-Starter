<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Slider from '~/components/Slider.vue';

const flux = reactive({
  slider: '0',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Slider', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Slider</div>
  </div>

  <div class="flex flex-col border p-4 gap-2">
    <div class="font-bold">Basic</div>

    <div class="flex justify-center">
      <Slider v-model:value="flux.slider" />
    </div>

    <div>
      <pre>Output: {{ flux.slider }}</pre>
    </div>
  </div>
</template>
