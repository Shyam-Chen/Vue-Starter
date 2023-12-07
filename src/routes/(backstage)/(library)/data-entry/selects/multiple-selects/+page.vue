<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XMultiselect } from '@x/ui';

const flux = reactive({
  basic: [],

  multiselect1: ['f4', 'b2'],
  multiselect1Options: [
    { label: 'Angular', value: 'f1' },
    { label: 'React', value: 'f2' },
    { label: 'Svelte', value: 'f3' },
    { label: 'Vue', value: 'f4' },
    { label: 'Express', value: 'b1' },
    { label: 'Fastify', value: 'b2' },
    { label: 'Koa', value: 'b3' },
    { label: 'Nest', value: 'b4' },
    { label: 'Capacitor', value: 'm1' },
    { label: 'Cordova', value: 'm2' },
    { label: 'Ionic', value: 'm3' },
    { label: 'NativeScript', value: 'm4' },
    { label: 'Electron', value: 'd1' },
    { label: 'NW', value: 'd2' },
    { label: 'Neutralino', value: 'd3' },
    { label: 'Tauri', value: 'd4' },
  ],

  multiselect2: [],
});
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Selects' },
      { text: 'Multiselect' },
    ]"
  />

  <div class="text-4xl font-extrabold my-4">Multiselect</div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4">Basic</div>

    <XMultiselect
      v-model:value="flux.basic"
      label="Tech Stack"
      :options="flux.multiselect1Options"
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Disabled</div>

    <XMultiselect
      v-model:value="flux.multiselect1"
      label="Tech Stack"
      :options="flux.multiselect1Options"
      disabled
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Clearable</div>

    <XMultiselect
      v-model:value="flux.multiselect1"
      label="Tech Stack"
      :options="flux.multiselect1Options"
      clearable
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Filterable</div>

    <XMultiselect
      v-model:value="flux.multiselect1"
      label="Tech Stack"
      :options="flux.multiselect1Options"
      filterable
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Invalid</div>

    <XMultiselect
      v-model:value="flux.multiselect1"
      label="Tech Stack"
      :options="flux.multiselect1Options"
      invalid
    />

    <div class="my-4">
      <div class="text-2xl font-semibold my-4 pt-5">Error Message</div>

      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        invalid="Incorrect entry"
      />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Loading</div>

    <XMultiselect
      v-model:value="flux.multiselect1"
      label="Tech Stack"
      :options="flux.multiselect1Options"
      loading
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Selected Labels</div>

    <XMultiselect
      v-model:value="flux.multiselect1"
      label="Tech Stack"
      :options="flux.multiselect1Options"
      selectedLabels
    />
  </div>
</template>
