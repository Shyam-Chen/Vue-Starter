<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import RichTextEditor from '~/components/RichTextEditor.vue';
import Button from '~/components/Button.vue';
import CodeBlock from '~/components/CodeBlock.vue';

const content = ref('<h1>h1. Heading</h1>');

const code = ref(`
<pre><code class="language-ts">_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]</code></pre>
`);

const code2 = ref(`
<pre><code class="language-vue">&lt;script lang="ts" setup&gt;
import { ref } from 'vue';

const msg = ref('Hello World!');
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;{{ msg }}&lt;/h1&gt;
  &lt;input v-model="msg"&gt;
&lt;/template&gt;</code></pre>
`);

function setContent() {
  content.value = `
    <h1>h1. Heading</h1>
    <h2>h2. Heading</h2>
    <h3>h3. Heading</h3>
    <h4>h4. Heading</h4>
    <h5>h5. Heading</h5>
    <h6>h6. Heading</h6>

    <p><span style="color: #FE68C9">Text Color</span></p>

    <p>This isn’t bold.</p>
    <p><strong>This is bold.</strong></p>
    <p><em>This is italic.</em></p>
  `;
}
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'RichTextEditor' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">RichTextEditor</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-2">
    <div>Basic</div>
    <RichTextEditor v-model="content" />
    <div class="border rounded p-4">{{ content }}</div>
    <Button @click="setContent">Set Content</Button>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-2">
    <div>CodeBlock</div>
    <CodeBlock :code="code" />
    <CodeBlock :code="code2" />
  </div>
</template>
