<script lang="ts" setup>
import { XTree } from '@x/ui';
import { onMounted, ref } from 'vue';

import nodesData from './nodesData';

const nodes = ref<typeof nodesData>();

onMounted(() => {
  nodes.value = structuredClone(nodesData);
});

type XTreeProps = InstanceType<typeof XTree>;

const selected = ref('');

const nodeSelect: XTreeProps['onSelect'] = (node) => {
  selected.value = node.value as string;
};
</script>

<template>
  <XTree :nodes @select="nodeSelect" />

  <div class="mt-1 flex gap-2">
    Selected:
    <pre>{{ selected }}</pre>
  </div>
</template>
