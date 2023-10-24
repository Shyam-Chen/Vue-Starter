<script lang="ts" setup>
import 'highlight.js/styles/atom-one-dark.css';
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
  @apply px-4 py-3 bg-slate-900 text-slate-300 border border-slate-400 rounded-md;

  :deep(code) {
    @apply text-sm;
  }
}
</style>
