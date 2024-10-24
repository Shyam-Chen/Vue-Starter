<script lang="ts" setup>
import { ref } from 'vue';
import { XSelect } from '@x/ui';

const value = ref('');

const options = [
  {
    label: 'Front-end',
    items: [
      { label: 'Angular', value: 'angular' },
      { label: 'React', value: 'react' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  {
    label: 'Back-end',
    items: [
      { label: 'Nest', value: 'nest' },
      { label: 'Express', value: 'express' },
      { label: 'Fastify', value: 'fastify' },
      { label: 'Koa', value: 'koa' },
    ],
  },
];
</script>

<template>
  <XSelect v-model:value="value" label="Framework" :options />
</template>
