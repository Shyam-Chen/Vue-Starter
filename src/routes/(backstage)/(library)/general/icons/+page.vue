<script lang="ts" setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import CodeBlock from '~/components/CodeBlock.vue';

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
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'General' }, { text: 'Icons' }]" />

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

  <CodeBlock :code="code" />
</template>
