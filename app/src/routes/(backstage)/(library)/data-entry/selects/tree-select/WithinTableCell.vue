<script lang="ts" setup>
import { ref } from 'vue';
import { XTable, XTreeSelect } from '@x/ui';

import options from './options';

const selected = ref<string[]>([]);
</script>

<template>
  <XTable
    :columns="[
      { key: 'A', name: 'Layout' },
      { key: 'B', name: 'Flexbox & Grid' },
      { key: 'C', name: 'Spacing' },
      { key: 'D', name: 'Sizing' },
      { key: 'E', name: 'Typography' },
      { key: 'F', name: 'Backgrounds' },
      { key: 'G', name: 'Borders' },
      { key: 'H', name: 'Effects' },
      { key: 'I', name: 'Filters' },
      { key: 'J', name: 'Tables' },
      { key: 'K', name: 'Transitions & Animation' },
      { key: 'L', name: 'Transforms' },
      { key: 'M', name: 'Interactivity' },
      { key: 'N', name: 'SVG' },
      { key: 'O', name: 'Accessibility' },
    ]"
    :rows="[
      {
        A: 'Aspect Ratio',
        B: 'Flex Basis',
        C: 'Padding',
        D: 'Width',
        E: 'Font Family',
        F: 'Background Attachment',
        G: 'Border Radius',
        H: 'Box Shadow',
        I: 'Blur',
        J: 'Border Collapse',
        K: 'Transition Property',
        L: 'Scale',
        M: 'Accent Color',
        N: 'Fill',
        O: 'Screen Readers',
      },
    ]"
  >
    <template #D>
      <div class="w-64 py-1">
        <XTreeSelect v-model:value="selected" :options />
      </div>
    </template>
  </XTable>
</template>
