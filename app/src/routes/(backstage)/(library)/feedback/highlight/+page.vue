<script lang="ts" setup>
import { XBreadcrumb, XCard, XChipField, XHighlight, XTextField } from '@x/ui';
import { ref } from 'vue';

const query1 = ref('spotlight, emphasize and accentuate');
const query2 = ref(['spotlight', 'emphasize', 'Accentuate']);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Highlight' }]" />

  <h1 class="text-4xl font-extrabold my-4">Highlight</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">String</h2>

    <XCard>
      <XTextField v-model:value="query1" />

      <div class="mt-1">
        <XHighlight :query="[query1]">
          With the Highlight component, you can spotlight, emphasize and accentuate words.
        </XHighlight>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">String</h2>

    <XCard>
      <XChipField v-model:value="query2" />

      <div class="mt-1">
        <XHighlight :query="query2">
          With the Highlight component, you can spotlight, emphasize and accentuate words.
        </XHighlight>
      </div>
    </XCard>
  </section>
</template>
