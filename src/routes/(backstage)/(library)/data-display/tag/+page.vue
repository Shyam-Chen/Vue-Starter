<script lang="ts" setup>
import { XBreadcrumb, XCard, XTag, XCodeBlock } from '@x/ui';

const importCode = `import { XTag } from '@x/ui';`;

const basicCode = `<XTag>Primary</XTag>`;

const severityCode = `<XTag color="primary">Primary</XTag>
<XTag color="secondary">Secondary</XTag>
<XTag color="success">Success</XTag>
<XTag color="danger">Danger</XTag>
<XTag color="warning">Warning</XTag>
<XTag color="info">Info</XTag>`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tag' }]" />

  <h1 class="text-4xl font-extrabold my-4">Tag</h1>
  <p class="my-4">Tag component is used to categorize content.</p>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Import</h2>

    <XCodeBlock :code="importCode" language="ts" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Basic</h2>

    <XCard>
      <XTag>Primary</XTag>
    </XCard>

    <XCodeBlock :code="basicCode" language="html" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Severity</h2>

    <XCard>
      <div class="flex gap-4">
        <XTag color="primary">Primary</XTag>
        <XTag color="secondary">Secondary</XTag>
        <XTag color="success">Success</XTag>
        <XTag color="danger">Danger</XTag>
        <XTag color="warning">Warning</XTag>
        <XTag color="info">Info</XTag>
      </div>
    </XCard>

    <XCodeBlock :code="severityCode" language="html" />
  </section>
</template>
