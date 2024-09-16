<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { XBreadcrumb, XCard, XCheckbox, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';

const flux = reactive({
  checkbox1: false,

  checkbox2: false,
  checkboxes2: [{ checked: true }, { checked: false }, { checked: false }] as Array<{
    checked: boolean;
  }>,
  indeterminate2: true,
});

watch(
  () => flux.checkbox2,
  (val) => {
    flux.checkboxes2 = flux.checkboxes2.map((item) => ({ ...item, checked: val }));
  },
);

watch(
  () => flux.checkboxes2,
  (val) => {
    const checked = val.every((item) => item.checked);
    const unchecked = val.every((item) => !item.checked);

    flux.indeterminate2 = !(checked || unchecked);

    if (checked) flux.checkbox2 = true;
    if (unchecked) flux.checkbox2 = false;
  },
  { deep: true },
);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Checkbox' }]" />

  <h1 class="text-4xl font-extrabold my-4">Checkbox</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Readonly</h2>

    <XCard>
      <div class="flex gap-4">
        <XCheckbox checked readonly>Checkbox (checked)</XCheckbox>
        <XCheckbox readonly>Checkbox (unchecked)</XCheckbox>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XCheckbox invalid>Checkbox</XCheckbox>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Error Message</h3>

      <XCard>
        <XCheckbox invalid="Incorrect entry">Checkbox</XCheckbox>
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <div class="flex gap-4">
        <XCheckbox v-model:value="flux.checkbox1" disabled>Checkbox 1</XCheckbox>
        <XCheckbox checked disabled>Checkbox (checked + disabled)</XCheckbox>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Indeterminate</h2>

    <XCard>
      <div class="flex">
        <XCheckbox v-model:value="flux.checkbox2" :indeterminate="flux.indeterminate2">
          Checkbox 2
        </XCheckbox>
      </div>

      <div class="flex gap-4 ml-7 mt-1">
        <XCheckbox
          v-for="(item, index) in flux.checkboxes2"
          :key="index"
          v-model:value="item.checked"
        >
          Checkbox 2-{{ index + 1 }}
        </XCheckbox>
      </div>
    </XCard>
  </section>
</template>
