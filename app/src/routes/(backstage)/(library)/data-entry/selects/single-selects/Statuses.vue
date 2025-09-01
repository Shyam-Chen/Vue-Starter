<script lang="ts" setup>
import { XCheckboxGroup, XDivider, XSelect } from '@x/ui';
import { ref } from 'vue';

const value = ref('');

const options = ref([
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
  { label: 'Nest', value: 'nest' },
  { label: 'Express', value: 'express' },
  { label: 'Fastify', value: 'fastify' },
  { label: 'Koa', value: 'koa' },
  { label: 'Analog', value: 'analog' },
  { label: 'Next', value: 'next' },
  { label: 'SvelteKit', value: 'svelte-kit' },
  { label: 'Nuxt', value: 'nuxt' },
]);

const statuses = ref<string[]>([]);
</script>

<template>
  <XSelect
    v-model:value="value"
    label="Example label"
    :options
    :filterable="statuses.includes('filterable')"
    :disabled="statuses.includes('disabled')"
    :loading="statuses.includes('loading')"
    :clearable="statuses.includes('clearable')"
    :invalid="statuses.includes('invalid') && 'Incorrect entry'"
  />
  <div class="mt-1">Output: {{ value }}</div>

  <XDivider />

  <XCheckboxGroup
    v-model:value="statuses"
    :options="[
      { label: 'Filterable', value: 'filterable' },
      { label: 'Disabled', value: 'disabled' },
      { label: 'Loading', value: 'loading' },
      { label: 'Clearable', value: 'clearable' },
      { label: 'Invalid', value: 'invalid' },
    ]"
  />
</template>
