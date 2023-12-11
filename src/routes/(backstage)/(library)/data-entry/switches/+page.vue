<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XCodeBlock, XSwitch } from '@x/ui';

function escape(html: string) {
  return html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

const codeImport = `<pre><code class="language-ts">import { XSwitch } from '@x/ui';</code></pre>`;
const codeBasic = `<pre><code class="language-html">${escape(
  `<XSwitch v-model:value="checked">Switch</XSwitch>`,
)}</code></pre>`;

const codeWithoutLabels = `<pre><code class="language-html">${escape(
  `<XSwitch v-model:value="checked" />`,
)}</code></pre>`;

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

    <XCodeBlock :code="codeImport" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>
    <p class="my-4">Two-way value binding is defined using `v-model:value`.</p>

    <XCard>
      <div class="flex justify-center">
        <XSwitch v-model:value="flux.switch1">Switch</XSwitch>
      </div>
    </XCard>

    <XCodeBlock :code="codeBasic" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Readonly</h2>

    <XCard>
      <div class="flex justify-center gap-4">
        <XSwitch checked readonly>Switch (checked)</XSwitch>
        <XSwitch :checked="false" readonly>Switch (unchecked)</XSwitch>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>
    <p class="my-4">When `disabled` is present, the element cannot be edited and focused.</p>

    <XCard>
      <div class="flex justify-center">
        <XSwitch v-model:value="flux.switch1" disabled>Switch</XSwitch>
      </div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Without labels</h2>

    <XCard>
      <div class="flex justify-center">
        <XSwitch v-model:value="flux.switch1" />
      </div>
    </XCard>

    <XCodeBlock :code="codeWithoutLabels" />
  </section>
</template>
