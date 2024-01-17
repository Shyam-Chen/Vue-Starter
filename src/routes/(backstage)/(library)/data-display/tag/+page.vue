<script lang="ts" setup>
import { XBreadcrumb, XCard, XTag, XCodeBlock } from '@x/ui';

function escape(html: string) {
  return html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

const importCode = `<pre><code class="language-ts">import { XTag } from '@x/ui';</code></pre>`;

const basicCode = `<pre><code class="language-html">${escape(`<XTag>Primary</XTag>`)}</code></pre>`;

const severityCode = `<pre><code class="language-html">${escape(`<XTag color="primary">Primary</XTag>`)}
${escape(`<XTag color="secondary">Secondary</XTag>`)}
${escape(`<XTag color="success">Success</XTag>`)}
${escape(`<XTag color="danger">Danger</XTag>`)}
${escape(`<XTag color="warning">Warning</XTag>`)}
${escape(`<XTag color="info">Info</XTag>`)}</code></pre>`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tag' }]" />

  <h1 class="text-4xl font-extrabold my-4">Tag</h1>
  <p class="my-4">Tag component is used to categorize content.</p>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Import</h2>

    <XCodeBlock :code="importCode" />
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Basic</h2>

    <XCard>
      <XTag>Primary</XTag>
    </XCard>

    <XCodeBlock :code="basicCode" />
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

    <XCodeBlock :code="severityCode" />
  </section>
</template>
