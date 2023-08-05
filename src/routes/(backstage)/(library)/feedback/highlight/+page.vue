<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import TextField from '~/components/TextField.vue';
import ChipField from '~/components/ChipField.vue';
import Highlight from '~/components/Highlight.vue';

const query1 = ref('spotlight, emphasize and accentuate');
const query2 = ref(['spotlight', 'emphasize', 'Accentuate']);
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Highlight', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Highlight</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">String</div>

    <TextField v-model:value="query1" />

    <Highlight :query="[query1]">
      With the Highlight component, you can spotlight, emphasize and accentuate words.
    </Highlight>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Array</div>

    <ChipField v-model:value="query2" />

    <Highlight :query="query2">
      With the Highlight component, you can spotlight, emphasize and accentuate words.
    </Highlight>
  </div>
</template>
