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
    <div class="text-4xl font-extrabold">TextField</div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4">Basic</div>

    <XTextField v-model:value="flux.textField1" label="Example label" placeholder="Type here..." />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Required</div>

    <XTextField
      v-model:value="flux.textField1"
      label="Example label"
      placeholder="Type here..."
      required
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Invalid</div>

    <XTextField
      v-model:value="flux.textField1"
      label="Example label"
      placeholder="Type here..."
      required
      invalid
    />

    <div class="my-4">
      <div class="text-2xl font-semibold my-4 pt-5">Error Message</div>

      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        required
        invalid="Incorrect entry"
      />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Disabled</div>

    <XTextField
      v-model:value="flux.textField1"
      label="Example label"
      placeholder="Type here..."
      disabled
    />
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Clearable</div>

    <XTextField
      v-model:value="flux.textField1"
      label="Example label"
      placeholder="Type here..."
      clearable
    />

    <div class="my-4">
      <div class="text-2xl font-semibold my-4 pt-5">Append Icons</div>

      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        append="i-mdi-user-circle"
        clearable
      />
    </div>
  </div>

  <div class="my-8">
    <div class="text-3xl font-bold my-4 pt-6">Icons</div>

    <div class="grid grid-cols-2 gap-4">
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
        invalid="Incorrect entry"
      />

      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        append="i-mdi-user-circle"
        invalid="Incorrect entry"
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
