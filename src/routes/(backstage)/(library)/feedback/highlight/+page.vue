<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XTextField, XHighlight, XChipField } from '@x/ui';

const query1 = ref('spotlight, emphasize and accentuate');
const query2 = ref(['spotlight', 'emphasize', 'Accentuate']);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Highlight' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Highlight</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">String</div>

    <XTextField v-model:value="query1" />

    <XHighlight :query="[query1]">
      With the Highlight component, you can spotlight, emphasize and accentuate words.
    </XHighlight>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Array</div>

    <XChipField v-model:value="query2" />

    <XHighlight :query="query2">
      With the Highlight component, you can spotlight, emphasize and accentuate words.
    </XHighlight>
  </div>
</template>
