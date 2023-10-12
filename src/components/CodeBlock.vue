<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { createLowlight } from 'lowlight';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.css';

const props = defineProps<{
  code?: string;
}>();

const lowlight = createLowlight();
lowlight.register({ xml, css, js, ts });

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
  :deep(pre) {
    @apply px-4 py-3 bg-slate-900 text-slate-300 border border-slate-400 rounded-md;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }
}
</style>
