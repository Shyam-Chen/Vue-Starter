<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XMultiselect } from '@x/ui';

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

  <h1 class="text-4xl font-extrabold my-4">Multiselect</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XMultiselect
        v-model:value="flux.basic"
        label="Tech Stack"
        :options="flux.multiselect1Options"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        disabled
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Clearable</h2>

    <XCard>
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        clearable
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Filterable</h2>

    <XCard>
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        filterable
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        invalid
      />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Error Message</h3>

      <XCard>
        <XMultiselect
          v-model:value="flux.multiselect1"
          label="Tech Stack"
          :options="flux.multiselect1Options"
          invalid="Incorrect entry"
        />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h3 class="text-3xl font-bold my-4 pt-6">Loading</h3>

    <XCard>
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        loading
      />
    </XCard>
  </section>

  <section class="my-8">
    <h3 class="text-3xl font-bold my-4 pt-6">Selected Labels</h3>

    <XCard>
      <XMultiselect
        v-model:value="flux.multiselect1"
        label="Tech Stack"
        :options="flux.multiselect1Options"
        selectedLabels
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Group (TODO)</h2>

    <XCard>
      <!-- <Group /> -->
    </XCard>
  </section>
</template>
