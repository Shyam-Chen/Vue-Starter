<script lang="ts" setup>
import { ref } from 'vue';
import { XButton, XDialog, XDivider, XTable, XTreeSelect } from '@x/ui';

import options from './options';

const status = ref(false);
const selected = ref<string[]>([]);
const more = ref(false);
</script>

<template>
  <XButton label="Launch" @click="status = true" />

  <XDialog v-model="status" title="TreeSelect within TableCell within Dialog">
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

    <XDivider />

    <XButton color="info" @click="more = !more">More</XButton>

    <div v-if="more" class="flex flex-col gap-4 mt-4">
      <p v-for="num in 5" :key="num">
        {{ num }}. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
  </XDialog>
</template>
