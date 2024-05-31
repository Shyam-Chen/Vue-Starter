<script lang="ts" setup>
import { XBreadcrumb, XButton, XCard, XTreeSelect } from '@x/ui';
import { ref } from 'vue';

const values = ref<string[]>([]);

const options = [
  {
    label: '1',
    value: '1',
    children: [
      {
        label: '1-1',
        value: '1-1',
        children: [
          { label: '1-1-1', value: '1-1-1' },
          { label: '1-1-2', value: '1-1-2' },
        ],
      },
      {
        label: '1-2',
        value: '1-2',
        children: [
          { label: '1-2-1', value: '1-2-1' },
          { label: '1-2-2', value: '1-2-2' },
        ],
      },
      {
        label: '1-3',
        value: '1-3',
        children: [
          { label: '1-3-1', value: '1-3-1' },
          {
            label: '1-3-2',
            value: '1-3-2',
            children: [
              { label: '1-3-2-1', value: '1-3-2-1' },
              { label: '1-3-2-2', value: '1-3-2-2' },
            ],
          },
          { label: '1-3-3', value: '1-3-3' },
        ],
      },
    ],
  },
  {
    label: '2',
    value: '2',
    children: [
      {
        label: '2-1',
        value: '2-1',
        children: [
          {
            label: '2-1-1',
            value: '2-1-1',
            children: [
              { label: '2-1-1-1', value: '2-1-1-1' },
              { label: '2-1-1-2', value: '2-1-1-2' },
            ],
          },
          { label: '2-1-2', value: '2-1-2' },
        ],
      },
      { label: '2-2', value: '2-2' },
    ],
  },
  { label: '3', value: '3' },
];

const setValues = () => {
  values.value = ['2', '2-1', '2-1-2', '2-2'];
};
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
</template>
