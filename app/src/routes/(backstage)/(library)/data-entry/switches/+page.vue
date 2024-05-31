<script lang="ts" setup>
import { XBreadcrumb, XCard, XCodeBlock, XSwitch } from '@x/ui';
import { reactive } from 'vue';

import Basic from './Basic.vue';
import BasicCode from './Basic.vue?raw';

const codeImport = `import { XSwitch } from '@x/ui';`;

const codeReadonly = `<XSwitch checked readonly>Switch (checked)</XSwitch>
<XSwitch :checked="false" readonly>Switch (unchecked)</XSwitch>`;

const codeDisabled = `<XSwitch v-model:value="checked" disabled>Switch</XSwitch>`;

const codeWithoutLabels = `<XSwitch v-model:value="checked" />`;

const flux = reactive({
  switch1: false,
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Switch' }]" />

  <h1 class="text-4xl font-extrabold my-4">Switch</h1>
  <p class="my-4">Switch is used to select a boolean value.</p>

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

    <XCodeBlock :code="BasicCode" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Readonly</h2>

    <XCard>
      <div class="flex gap-4">
        <XSwitch checked readonly>Switch (checked)</XSwitch>
        <XSwitch :checked="false" readonly>Switch (unchecked)</XSwitch>
      </div>
    </XCard>

    <XCodeBlock :code="codeReadonly" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>
    <p class="my-4">When `disabled` is present, the element cannot be edited and focused.</p>

    <XCard>
      <XSwitch v-model:value="flux.switch1" disabled>Switch</XSwitch>
    </XCard>

    <XCodeBlock :code="codeDisabled" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Without labels</h2>

    <XCard>
      <XSwitch v-model:value="flux.switch1" />
    </XCard>

    <XCodeBlock :code="codeWithoutLabels" language="html" />
  </section>
</template>
