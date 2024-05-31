<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { XBreadcrumb, XCard, XTextField, XCode, XChipField } from '@x/ui';

const flux = reactive({
  textField1: '',
  textField2: 'Vue is excellent',
  chipField: ['Vue', 'Fastify', 'Tauri'],
});

const alpha = ref('');
const alphanum = ref('');
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'TextField' }]" />

  <h1 class="text-4xl font-extrabold my-4">TextField</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTextField v-model:value="flux.textField1" placeholder="Type here..." />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Label</h2>

    <XCard>
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Required</h2>

    <XCard>
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        required
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        required
        invalid
      />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Error Message</h3>

      <XCard>
        <XTextField
          v-model:value="flux.textField1"
          label="Example label"
          placeholder="Type here..."
          required
          invalid="Incorrect entry"
        />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XTextField
        v-model:value="flux.textField1"
        label="Example label"
        placeholder="Type here..."
        disabled
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Clearable</h2>

    <XCard>
      <XTextField
        v-model:value="flux.textField2"
        label="Example label"
        placeholder="Type here..."
        clearable
      />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Append Icons</h3>

      <XCard>
        <XTextField
          v-model:value="flux.textField2"
          label="Example label"
          placeholder="Type here..."
          append="i-mdi-user-circle"
          clearable
        />
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Icons</h2>

    <XCard>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Pattern</h2>

    <XCard>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <XTextField v-model:value="alpha" label="Alphabetic" pattern="^[A-Za-z]+$">
          <XCode class="ms-1">^[A-Za-z]+$</XCode>
        </XTextField>

        <XTextField v-model:value="alphanum" label="Alphanumeric" pattern="^[A-Za-z0-9]+$">
          <XCode class="ms-1">^[A-Za-z0-9]+$</XCode>
        </XTextField>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">ChipField</h2>

    <XCard>
      <XChipField v-model:value="flux.chipField" placeholder="Type here...">
        Example label
      </XChipField>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Disabled</h3>

      <XCard>
        <XChipField v-model:value="flux.chipField" placeholder="Type here..." disabled>
          Example label
        </XChipField>
      </XCard>
    </section>
  </section>
</template>
