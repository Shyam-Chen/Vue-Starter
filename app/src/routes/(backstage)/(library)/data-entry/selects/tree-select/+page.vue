<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XButton, XCard, XTreeSelect } from '@x/ui';

import WithinPopover from './WithinPopover.vue';

const values = ref<string[]>([]);

const options = [
  {
    label: 'Web-side',
    value: '1',
    children: [
      {
        label: 'HTML',
        value: '1-1',
        children: [
          { label: 'Nunjucks', value: '1-1-1' },
          { label: 'Pug', value: '1-1-2' },
        ],
      },
      {
        label: 'CSS',
        value: '1-2',
        children: [
          { label: 'SCSS', value: '1-2-1' },
          { label: 'Stylus', value: '1-2-2' },
          { label: 'Tailwind', value: '1-2-3' },
        ],
      },
      {
        label: 'JavaScript',
        value: '1-3',
        children: [
          { label: 'TypeScript', value: '1-3-1' },
          {
            label: 'Vue',
            value: '1-3-2',
            children: [
              { label: 'Pinia', value: '1-3-2-1' },
              { label: 'Nuxt', value: '1-3-2-2' },
            ],
          },
          { label: 'Vite', value: '1-3-3' },
        ],
      },
    ],
  },
  {
    label: 'Native-side',
    value: '2',
    children: [
      {
        label: 'Tauri',
        value: '2-1',
        children: [
          { label: 'Rust', value: '2-1-1' },
          { label: 'Cargo', value: '2-1-2' },
        ],
      },
      { label: 'Xcode', value: '2-2' },
    ],
  },
  {
    label: 'Server-side',
    value: '3',
    children: [
      { label: 'Node.js', value: '3-1', children: [{ label: 'Fastify', value: '3-1-1' }] },
      { label: 'MongoDB', value: '3-2' },
    ],
  },
  {
    label: 'Cloud-side',
    value: '4',
    children: [
      { label: 'Amazon Web Services', value: '4-1' },
      {
        label: 'Microsoft Azure',
        value: '4-2',
        children: [
          { label: 'AI + machine learning', value: '4-2-1' },
          { label: 'Compute', value: '4-2-3' },
          { label: 'Containers', value: '4-2-4' },
          {
            label: 'Databases',
            value: '4-2-5',
            children: [
              { label: 'Azure Cache for Redis', value: '4-2-5-1' },
              { label: 'Azure Cosmos DB', value: '4-2-5-2' },
            ],
          },
        ],
      },
      {
        label: 'Google Cloud',
        value: '4-3',
        children: [
          { label: 'AI and Machine Learning', value: '4-3-1' },
          {
            label: 'Compute',
            value: '4-3-3',
            children: [
              { label: 'Cloud Run', value: '4-3-3-5' },
              { label: 'Deep Learning VM Image', value: '4-3-3-7' },
            ],
          },
          { label: 'Databases', value: '4-3-6' },
        ],
      },
    ],
  },
];

const setValues = () => {
  values.value = ['2', '2-1', '2-1-2', '2-2'];
};

const values2 = ref<string[]>([]);
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Selects' },
      { text: 'TreeSelect' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">TreeSelect</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTreeSelect v-model:value="values" :options />
      <div class="my-1">{{ values }}</div>
      <XButton label="Set Values" @click="setValues" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Labels</h2>

    <XCard>
      <XTreeSelect v-model:value="values2" label="Tech Stack" :options selectedLabels />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Within Popover</h2>

    <XCard>
      <WithinPopover />
    </XCard>
  </section>
</template>
