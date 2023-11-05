<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import ts from 'highlight.js/lib/languages/typescript';

const props = defineProps<{
  code?: string;
}>();

const lowlight = createLowlight();
lowlight.register({ html, css, ts });

const editor = ref();

onMounted(() => {
  editor.value = new Editor({
    editable: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: props.code,
  });
});
</script>

<template>
  <div v-if="editor" class="my-4">
    <div class="Editor">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Editor {
  @apply px-4 py-3 border rounded-md;
  @apply border-#383a42/50 dark:border-#abb2bf/50;
  @apply text-#383a42 dark:text-#abb2bf;
  @apply bg-#fafafa dark:bg-#282c34;

  :deep(code) {
    @apply text-sm;
  }

  :deep(.hljs-comment),
  :deep(.hljs-quote) {
    @apply text-#a0a1a7;
    @apply italic;
  }

  :deep(.hljs-doctag),
  :deep(.hljs-keyword),
  :deep(.hljs-formula) {
    @apply text-#a626a4;
  }

  :deep(.hljs-section),
  :deep(.hljs-name),
  :deep(.hljs-selector-tag),
  :deep(.hljs-deletion),
  :deep(.hljs-subst) {
    @apply text-#e45649;
  }

  :deep(.hljs-literal) {
    @apply text-#0184bb;
  }

  :deep(.hljs-string),
  :deep(.hljs-regexp),
  :deep(.hljs-addition),
  :deep(.hljs-attribute),
  :deep(.hljs-meta .hljs-string) {
    @apply text-#50a14f;
  }

  :deep(.hljs-attr),
  :deep(.hljs-variable),
  :deep(.hljs-template-variable),
  :deep(.hljs-type),
  :deep(.hljs-selector-class),
  :deep(.hljs-selector-attr),
  :deep(.hljs-selector-pseudo),
  :deep(.hljs-number) {
    @apply text-#986801;
  }

  :deep(.hljs-symbol),
  :deep(.hljs-bullet),
  :deep(.hljs-link),
  :deep(.hljs-meta),
  :deep(.hljs-selector-id),
  :deep(.hljs-title) {
    @apply text-#4078f2;
  }

  :deep(.hljs-built_in),
  :deep(.hljs-title.class_),
  :deep(.hljs-class .hljs-title) {
    @apply text-#c18401;
  }

  :deep(.hljs-emphasis) {
    @apply italic;
  }

  :deep(.hljs-strong) {
    @apply font-bold;
  }

  :deep(.hljs-link) {
    @apply underline;
  }
}

.dark .Editor {
  :deep(.hljs-comment),
  :deep(.hljs-quote) {
    @apply text-#5c6370;
  }

  :deep(.hljs-doctag),
  :deep(.hljs-keyword),
  :deep(.hljs-formula) {
    @apply text-#c678dd;
  }

  :deep(.hljs-section),
  :deep(.hljs-name),
  :deep(.hljs-selector-tag),
  :deep(.hljs-deletion),
  :deep(.hljs-subst) {
    @apply text-#e06c75;
  }

  :deep(.hljs-literal) {
    @apply text-#56b6c2;
  }

  :deep(.hljs-string),
  :deep(.hljs-regexp),
  :deep(.hljs-addition),
  :deep(.hljs-attribute),
  :deep(.hljs-meta .hljs-string) {
    @apply text-#98c379;
  }

  :deep(.hljs-attr),
  :deep(.hljs-variable),
  :deep(.hljs-template-variable),
  :deep(.hljs-type),
  :deep(.hljs-selector-class),
  :deep(.hljs-selector-attr),
  :deep(.hljs-selector-pseudo),
  :deep(.hljs-number) {
    @apply text-#d19a66;
  }

  :deep(.hljs-symbol),
  :deep(.hljs-bullet),
  :deep(.hljs-link),
  :deep(.hljs-meta),
  :deep(.hljs-selector-id),
  :deep(.hljs-title) {
    @apply text-#61aeee;
  }

  :deep(.hljs-built_in),
  :deep(.hljs-title.class_),
  :deep(.hljs-class .hljs-title) {
    @apply text-#e6c07b;
  }
}
</style>
