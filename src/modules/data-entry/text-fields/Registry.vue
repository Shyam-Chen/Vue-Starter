<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import ChipField from '~/components/ChipField.vue';

const flux = reactive({
  textField1: '',
  chipField: [],
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Text Fields', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Text Fields</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <TextField v-model:value="flux.textField1" placeholder="Type here..."
        >Example label</TextField
      >
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <TextField v-model:value="flux.textField1" placeholder="Type here..." disabled
        >Example label</TextField
      >
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Icons</div>

    <div class="flex justify-center">
      <TextField v-model:value="flux.textField1" placeholder="Type here..."
        >Example label</TextField
      >
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Chips</div>

    <div class="flex justify-center">
      <ChipField v-model:value="flux.chipField" placeholder="Type here...">Example label</ChipField>
      <ChipField v-model:value="flux.chipField" placeholder="Type here..." disabled
        >Example label</ChipField
      >
    </div>
  </div>
</template>
