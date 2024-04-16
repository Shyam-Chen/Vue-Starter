<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { XTree, XButton } from '@x/ui';

import nodesData from './nodesData';

const nodes = ref();

onMounted(() => {
  nodes.value = nodesData;
});

const expandAll = () => {
  for (const node of nodes.value) {
    node.status = true;

    if (node.children?.length) {
      node.status = true;
    }
  }
};

const collapseAll = () => {
  for (const node of nodes.value) {
    node.status = false;

    if (node.children?.length) {
      node.status = false;
    }
  }
};
</script>

<template>
  <div class="flex gap-2 mb-2">
    <XButton label="Expand All" @click="expandAll" />
    <XButton label="Collapse All" @click="collapseAll" />
  </div>

  <XTree :nodes="nodes" />
</template>
