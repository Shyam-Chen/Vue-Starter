<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XCheckboxGroup, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';

const flux = reactive({
  checkboxGroup1: [] as string[],
  checkboxGroup1Options: ['Angular', 'React', 'Svelte', 'Vue'],

  checkboxGroup2: [] as { label: string; value: string }[],
  checkboxGroup2Options: [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Vue', value: 'vue' },
  ],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'CheckboxGroup' }]" />

  <h1 class="text-4xl font-extrabold my-4">CheckboxGroup</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" class="max-h-100" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XCheckboxGroup
        v-model:value="flux.checkboxGroup1"
        :options="flux.checkboxGroup1Options"
        invalid
      />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Error Message</h3>

      <XCard>
        <XCheckboxGroup
          v-model:value="flux.checkboxGroup1"
          :options="flux.checkboxGroup1Options"
          invalid="Incorrect entry"
        />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XCheckboxGroup
        v-model:value="flux.checkboxGroup1"
        :options="flux.checkboxGroup1Options"
        disabled
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Options</h2>

    <XCard>
      <XCheckboxGroup v-model:value="flux.checkboxGroup2" :options="flux.checkboxGroup2Options" />
      <div class="mt-1">{{ flux.checkboxGroup2 }}</div>
    </XCard>
  </section>
</template>
