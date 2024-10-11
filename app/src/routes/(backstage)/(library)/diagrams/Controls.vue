<script lang="ts" setup>
import { Panel, useVueFlow } from '@vue-flow/core';
import { XButton } from '@x/ui';

import BlankCard from './BlankCard.vue';

const { nodes, dimensions, viewport, addNodes } = useVueFlow();

function onAdd() {
  const id = nodes.value.length + 1;

  const newNode = {
    id: `${id}`,
    type: BlankCard.name,
    position: {
      x: (dimensions.value.width / 2 - viewport.value.x) / viewport.value.zoom,
      y: (dimensions.value.height / 2 - viewport.value.y) / viewport.value.zoom,
    },
    data: { label: `Node ${id}` },
  };

  addNodes([newNode]);
}
</script>

<template>
  <Panel position="top-right">
    <XButton icon="i-material-symbols-add-rounded" @click="onAdd" />
  </Panel>
</template>
