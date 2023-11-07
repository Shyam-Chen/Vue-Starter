<script lang="ts" setup>
import { XBreadcrumb, XTag, XCodeBlock } from '@x/ui';

function escape(html: string) {
  return html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

const primary = escape(`<XTag>Primary</XTag>`);
const secondary = escape(`<XTag color="secondary">Secondary</XTag>`);
const success = escape(`<XTag color="success">Success</XTag>`);
const danger = escape(`<XTag color="danger">Danger</XTag>`);
const warning = escape(`<XTag color="warning">Warning</XTag>`);
const info = escape(`<XTag color="info">Info</XTag>`);

const code = `<pre><code class="language-html">${primary}
${secondary}
${success}
${danger}
${warning}
${info}</code></pre>`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Tag' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Tag</div>
  </div>

  <XTag>Primary</XTag>
  <XTag color="secondary">Secondary</XTag>
  <XTag color="success">Success</XTag>
  <XTag color="danger">Danger</XTag>
  <XTag color="warning">Warning</XTag>
  <XTag color="info">Info</XTag>

  <XCodeBlock :code="code" />
</template>
