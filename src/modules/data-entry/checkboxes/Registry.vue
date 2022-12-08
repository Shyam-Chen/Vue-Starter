<script lang="ts" setup>
import { reactive, watch } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Checkbox from '~/components/Checkbox.vue';
import CheckboxGroup from '~/components/CheckboxGroup.vue';

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
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Checkboxes', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Checkboxes</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Checkbox v-model:value="flux.checkbox1">Checkbox 1</Checkbox>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <Checkbox v-model:value="flux.checkbox1" disabled>Checkbox 1</Checkbox>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Indeterminate</div>

    <div class="flex justify-center">
      <Checkbox v-model:value="flux.checkbox2" :indeterminate="flux.indeterminate2">
        Checkbox 2
      </Checkbox>
    </div>

    <div class="flex justify-center mt-2 space-x-6">
      <Checkbox v-for="(item, index) in flux.checkboxes2" :key="index" v-model:value="item.checked">
        Checkbox 2-{{ index + 1 }}
      </Checkbox>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Group</div>

    <div class="flex justify-center">
      <CheckboxGroup v-model:value="flux.checkboxGroup1" :options="flux.checkboxGroup1Options" />
    </div>

    <div class="flex justify-center">
      <pre>{{ flux.checkboxGroup1 }}</pre>
    </div>
  </div>
</template>
