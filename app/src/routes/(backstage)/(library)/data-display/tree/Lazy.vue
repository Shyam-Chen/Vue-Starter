<script lang="ts" setup>
import { XTree } from '@x/ui';
import { onMounted, ref } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

const nodes = ref<ComponentProps<typeof XTree>['nodes']>();

onMounted(() => {
  nodes.value = [
    {
      label: '1',
      value: '1',
      children: [],
    },
    {
      label: '2',
      value: '2',
      children: [],
    },
    { label: '3', value: '3' },
  ];
});
</script>

<template>
  <XTree :nodes="nodes" />
</template>
