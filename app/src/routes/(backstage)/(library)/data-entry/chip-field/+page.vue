<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock } from '@x/ui';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';
import Disabled from './Disabled.vue';
import DisabledCode from './Disabled.vue?raw';
import Invalid from './Invalid.vue';
import InvalidCode from './Invalid.vue?raw';

const codeImport = `import { XChipField } from '@x/ui';`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'ChipField' }]" />

  <h1 class="text-4xl font-extrabold my-4">ChipField</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Import</h2>

    <XCodeBlock :code="codeImport" language="ts" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>
    <p class="my-4">Two-way value binding is defined using `v-model:value`.</p>

    <XCard>
      <Basic />
    </XCard>

    <XCodeBlock :code="BasicCode" language="vue" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <Disabled />
    </XCard>

    <XCodeBlock :code="DisabledCode" language="vue" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <Invalid />
    </XCard>

    <XCodeBlock :code="InvalidCode" language="vue" />
  </section>
</template>
