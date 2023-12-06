<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XMultiselect } from '@x/ui';

const flux = reactive({
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
      { text: 'Multiple selects' },
    ]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Multiple selects</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        disabled
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Clearable</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        clearable
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Filterable</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        filterable
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        :invalid="'This is a required field'"
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Loading</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        loading
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Selected Labels</div>

    <div class="flex justify-center">
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        :invalid="'This is a required field'"
        selectedLabels
      />
    </div>
  </div>
</template>
