<script lang="ts" setup>
import { reactive } from 'vue';

import { XBreadcrumb } from '@x/ui';
import RadioGroup from '~/components/RadioGroup.vue';

const flux = reactive({
  radioGroup1: '',
  radioGroup1Options: ['Angular', 'React', 'Svelte', 'Vue'],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Radio buttons' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Radio buttons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <RadioGroup v-model:value="flux.radioGroup1" :options="flux.radioGroup1Options" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <RadioGroup v-model:value="flux.radioGroup1" :options="flux.radioGroup1Options" disabled />
    </div>
  </div>
</template>
