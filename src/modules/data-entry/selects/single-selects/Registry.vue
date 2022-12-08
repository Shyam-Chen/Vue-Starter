<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Select from '~/components/Select.vue';

const flux = reactive({
  select1: '',
  select1Options: [
    { label: 'Angular', value: 'f1' },
    { label: 'React', value: 'f2' },
    { label: 'Svelte', value: 'f3' },
    { label: 'Vue', value: 'f4' },
    { label: 'Nest', value: 'b1' },
    { label: 'Express', value: 'b2' },
    { label: 'Fastify', value: 'b3' },
    { label: 'Koa', value: 'b4' },
  ],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Selects', disabled: true },
      { text: 'Single selects', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Single selects</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Clearable</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" clearable />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Filterable</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" filterable />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors</div>

    <div class="flex justify-center">
      <Select v-model:value="flux.select1" :options="flux.select1Options" :errorMessage="'Error'" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Cascader</div>

    <div class="grid grid-cols-4 gap-4">
      <Select v-model:value="flux.select1" :options="flux.select1Options" />
      <Select v-model:value="flux.select1" :options="flux.select1Options" />
      <Select v-model:value="flux.select1" :options="flux.select1Options" />
      <Select v-model:value="flux.select1" :options="flux.select1Options" />
    </div>
  </div>
</template>
