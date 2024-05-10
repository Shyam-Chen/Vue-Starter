<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { XTree } from '@x/ui';

import nodesData from './nodesData';

const selected = ref<string[]>();
const nodes = ref<typeof nodesData>();

onMounted(() => {
  nodes.value = structuredClone(nodesData);
});
</script>

<template>
  <XTree v-model="selected" :nodes="nodes" multiple />

  <div class="mt-1 flex flex-col">
    Selected:
    <pre>{{ selected }}</pre>
  </div>
</template>
