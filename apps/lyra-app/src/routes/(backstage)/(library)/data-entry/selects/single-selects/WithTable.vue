<script lang="ts" setup>
import { reactive } from 'vue';
import { XSelect, XTable } from '@lyra/ui';

const flux = reactive({
  rows: [
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
  ],
});
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
    :rows="flux.rows"
  >
    <template #C="{ row }">
      <XSelect
        v-model:value="row.C"
        :options="
          ['Padding', 'Margin', 'Space Between'].map((item) => ({ label: item, value: item }))
        "
      />
    </template>

    <template #H="{ row }">
      <XSelect
        v-model:value="row.H"
        :options="
          [
            'Box Shadow',
            'Box Shadow Color',
            'Opacity',
            'Mix Blend Mode',
            'Background Blend Mode',
          ].map((item) => ({ label: item, value: item }))
        "
      />
    </template>
  </XTable>
</template>
