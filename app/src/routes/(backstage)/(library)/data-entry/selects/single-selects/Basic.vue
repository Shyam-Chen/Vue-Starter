<script lang="ts" setup>
import { ref } from 'vue';
import { XSelect } from '@x/ui';

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
</script>

<template>
  <XSelect v-model:value="value" label="Example label" :options />
  <div class="mt-1">Output: {{ value }}</div>
</template>
