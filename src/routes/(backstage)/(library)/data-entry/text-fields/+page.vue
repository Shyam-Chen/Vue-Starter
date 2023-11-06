<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XTextField, XChipField } from '@x/ui';

const flux = reactive({
  textField1: '',
  chipField: ['Vue', 'Fastify', 'Tauri'],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'TextField' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">TextField</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        disabled
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Icons</div>

    <div class="grid grid-cols-2 gap-3">
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        prepend="i-mdi-user-circle"
      />

      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        append="i-mdi-user-circle"
      />

      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        prepend="i-mdi-user-circle"
        errorMessage="Incorrect entry."
      />

      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        append="i-mdi-user-circle"
        errorMessage="Incorrect entry."
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Chips</div>

    <div class="flex justify-center mb-2">
      <XChipField v-model:value="flux.chipField" placeholder="Type here...">
        Example label
      </XChipField>
    </div>

    <div class="flex justify-center">
      <XChipField v-model:value="flux.chipField" placeholder="Type here..." disabled>
        Example label
      </XChipField>
    </div>
  </div>
</template>
