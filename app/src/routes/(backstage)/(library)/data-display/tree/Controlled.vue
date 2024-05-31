<script lang="ts" setup>
import { XButton, type XTree } from '@x/ui';
import { onMounted, ref } from 'vue';
import type { ComponentExposed } from 'vue-component-type-helpers';

import nodesData from './nodesData';

const tree = ref<ComponentExposed<typeof XTree>>();
const selected = ref('');
const nodes = ref<typeof nodesData>();

onMounted(() => {
  nodes.value = structuredClone(nodesData);
});
</script>

<template>
  <div class="flex gap-2 mb-2">
    <XButton label="Expand All" @click="tree?.expandAll" />
    <XButton label="Collapse All" @click="tree?.collapseAll" />
  </div>

  <XTree ref="tree" v-model="selected" :nodes="nodes" />

  <div class="mt-1 flex gap-2">
    Selected:
    <pre>{{ selected }}</pre>
  </div>
</template>
