<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { XBreadcrumb, XRichTextEditor, XButton, XCodeBlock } from '@x/ui';

const richTextEditor = ref();
const content = ref('');

onMounted(() => {
  content.value = `<h1>h1. Heading</h1>`;
});

function setContent() {
  const newContent = `
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

  richTextEditor.value.editor.commands.setContent(newContent);
  content.value = richTextEditor.value.editor.getHTML();
}

const code = ref(`
<pre><code class="language-ts">_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]</code></pre>
`);

const vueScriptStart = `<pre><code class="language-html">&lt;script lang="ts" setup&gt;</code></pre>`;
const vueScriptEnd = `<pre><code class="language-html">&lt;/script&gt;</code></pre><pre></pre>`;

const code2 = ref(`
${vueScriptStart}
<pre><code class="language-ts">import { ref } from 'vue';

const msg = ref('Hello World!');</code></pre>
${vueScriptEnd}
<pre><code class="language-html">&lt;template&gt;
  &lt;h1&gt;{{ msg }}&lt;/h1&gt;
  &lt;input v-model="msg" class="text-field"&gt;
&lt;/template&gt;

&lt;style lang="scss" scoped&gt;
.text-field {
  border: solid 1px #94A3B8;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
}
&lt;/style&gt;</code></pre>
`);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'RichTextEditor' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">RichTextEditor</div>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-2">
    <div>Basic</div>
    <XRichTextEditor ref="richTextEditor" v-model="content" />
    <div class="border rounded p-4">{{ content }}</div>
    <XButton @click="setContent">Set Content</XButton>
  </div>

  <div class="flex flex-col border p-4 mb-4 gap-2">
    <div>CodeBlock</div>
    <XCodeBlock :code="code" />
    <XCodeBlock :code="code2" />
  </div>
</template>
