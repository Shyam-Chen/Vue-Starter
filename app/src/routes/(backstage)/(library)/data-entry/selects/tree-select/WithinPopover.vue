<script lang="ts" setup>
import { reactive } from 'vue';
import { XPopover, XButton, XTreeSelect, XCard } from '@x/ui';

const flux = reactive({
  popoverStatus: false,
  select: [],
  select1Options: [
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
  ],
});
</script>

<template>
  <XPopover v-model="flux.popoverStatus">
    <XButton label="Launch" @click="flux.popoverStatus = true" />

    <template #content>
      <XCard class="w-xs">
        <XTreeSelect
          v-model:value="flux.select"
          label="Example label"
          :options="flux.select1Options"
        />
      </XCard>
    </template>
  </XPopover>
</template>
