<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';

const codeImport = `import { XWatermark } from '@x/ui';`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Watermark' }]" />

  <h1 class="text-4xl font-extrabold my-4">Watermark</h1>

  <p class="my-4">
    Watermark provides a customizable overlay to protect content and display copyright information.
  </p>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Import</h2>
    <XCodeBlock :code="codeImport" language="ts" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Basic</h2>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" class="max-h-100" />
  </section>
</template>
