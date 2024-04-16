<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { XTree } from '@x/ui';

const nodes = ref();

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
