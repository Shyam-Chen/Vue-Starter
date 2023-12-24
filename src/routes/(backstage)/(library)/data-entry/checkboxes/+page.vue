<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { XBreadcrumb, XCard, XCheckbox, XCheckboxGroup } from '@x/ui';

const flux = reactive({
  checkbox1: false,

  checkbox2: false,
  checkboxes2: [{ checked: false }, { checked: false }, { checked: false }] as Array<{
    checked?: boolean;
  }>,
  indeterminate2: false,

  checkboxGroup1: [],
  checkboxGroup1Options: ['Angular', 'React', 'Svelte', 'Vue'],
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
      <div class="flex justify-center">
        <XCheckbox v-model:value="flux.checkbox1">Checkbox 1</XCheckbox>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Readonly</h2>

    <XCard>
      <div class="flex justify-center gap-4">
        <XCheckbox checked readonly>Checkbox (checked)</XCheckbox>
        <XCheckbox readonly>Checkbox (unchecked)</XCheckbox>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <div class="flex justify-center gap-4">
        <XCheckbox invalid>Checkbox</XCheckbox>
        <XCheckbox invalid="Error message">Checkbox</XCheckbox>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <div class="flex justify-center gap-4">
        <XCheckbox v-model:value="flux.checkbox1" disabled>Checkbox 1</XCheckbox>
        <XCheckbox checked disabled>Checkbox (checked + disabled)</XCheckbox>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Indeterminate</h2>

    <XCard>
      <div class="flex justify-center">
        <XCheckbox v-model:value="flux.checkbox2" :indeterminate="flux.indeterminate2">
          Checkbox 2
        </XCheckbox>
      </div>

      <div class="flex justify-center mt-2 space-x-6">
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

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">CheckboxGroup</h2>

    <XCard>
      <XCheckboxGroup v-model:value="flux.checkboxGroup1" :options="flux.checkboxGroup1Options" />
      <div class="mt-1">{{ flux.checkboxGroup1 }}</div>
    </XCard>
  </section>
</template>
