<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XRadioGroup } from '@lyra/ui';

const flux = reactive({
  radioGroup1: '',
  radioGroup1Options: ['Angular', 'React', 'Svelte', 'Vue'],
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'RadioGroup' }]" />

  <h1 class="text-4xl font-extrabold my-4">RadioGroup</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XRadioGroup v-model:value="flux.radioGroup1" :options="flux.radioGroup1Options" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Label</h2>

    <XCard>
      <XRadioGroup
        v-model:value="flux.radioGroup1"
        label="Example label"
        :options="flux.radioGroup1Options"
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Required</h2>

    <XCard>
      <XRadioGroup
        v-model:value="flux.radioGroup1"
        label="Example label"
        :options="flux.radioGroup1Options"
        required
      />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XRadioGroup v-model:value="flux.radioGroup1" :options="flux.radioGroup1Options" disabled />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XRadioGroup v-model:value="flux.radioGroup1" :options="flux.radioGroup1Options" invalid />
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Error Message</h3>

      <XCard>
        <XRadioGroup
          v-model:value="flux.radioGroup1"
          :options="flux.radioGroup1Options"
          invalid="Incorrect entry"
        />
      </XCard>
    </section>
  </section>
</template>
