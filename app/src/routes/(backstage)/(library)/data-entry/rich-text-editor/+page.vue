<script lang="ts" setup>
import { XBreadcrumb, XButton, XCard, XRichTextEditor } from '@x/ui';
import { onMounted, ref } from 'vue';

const content = ref('');

onMounted(() => {
  content.value = `<h3>Heading</h3>`;
});

function setContent() {
  const newContent = `
    <h3>Heading</h3>
    <h4>Subheading</h4>

    <p><span style="color: #FE68C9">Text Color</span></p>

    <p>This isn't bold.</p>
    <p><strong>This is bold.</strong></p>
    <p><em>This is italic.</em></p>
  `;

  content.value = newContent;
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'RichTextEditor' }]" />

  <h1 class="text-4xl font-extrabold my-4">RichTextEditor</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>
    <p class="my-4">Two-way value binding is defined using `v-model`.</p>

    <XCard>
      <XRichTextEditor v-model="content" />
      <div class="border rounded p-4 my-4">{{ content }}</div>
      <XButton @click="setContent">Set Content</XButton>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Label</h2>

    <XCard>
      <XRichTextEditor v-model="content" label="Example label" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XRichTextEditor v-model="content" disabled />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Invalid</h2>

    <XCard>
      <XRichTextEditor v-model="content" invalid="Incorrect entry" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Read-only</h2>

    <XCard>
      <XRichTextEditor v-model="content" readonly />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">View-only</h2>

    <XCard>
      <XRichTextEditor v-model="content" viewonly />
    </XCard>
  </section>
</template>
