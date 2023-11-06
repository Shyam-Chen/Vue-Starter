<script lang="ts" setup>
import { XBreadcrumb, XCodeBlock } from '@x/ui';

const a = `<div class="i-fa-bell w-3 h-3 text-blue-500"></div>`
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const b = `<div class="i-fa-bell w-10 h-10 text-yellow-500"></div>`
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const code = `<pre><code class="language-html">${a}
${b}</code></pre>`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Icons' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Icons</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center items-center space-x-4">
      <div class="i-fa-bell w-3 h-3 text-blue-500"></div>
      <div class="i-fa-bell w-10 h-10 text-yellow-500"></div>
    </div>
  </div>

  <XCodeBlock :code="code" />
</template>
