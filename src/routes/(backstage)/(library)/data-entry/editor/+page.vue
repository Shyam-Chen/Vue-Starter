<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const editor = ref();

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: `
      <p>This isn’t bold.</p>
      <p><strong>This is bold.</strong></p>
    `,
    editorProps: {
      attributes: {
        class:
          'border border-slate-400 rounded px-3 py-2 min-h-65 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400',
      },
    },
  });
});
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Editor' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Editor</div>
  </div>

  <div v-if="editor" class="space-y-4">
    <div class="flex">
      <div class="flex gap-2">
        <div
          class="i-mdi-format-header-1 w-6 h-6"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        ></div>
        <div
          class="i-mdi-format-header-2 w-6 h-6"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        ></div>
        <div
          class="i-mdi-format-header-3 w-6 h-6"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        ></div>
        <div
          class="i-mdi-format-header-4 w-6 h-6"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        ></div>
        <div
          class="i-mdi-format-header-5 w-6 h-6"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        ></div>
        <div
          class="i-mdi-format-header-6 w-6 h-6"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        ></div>
      </div>

      <div class="border-r mx-2"></div>

      <div class="flex gap-2">
        <div
          class="i-mdi-format-bold w-6 h-6"
          @click="editor.chain().focus().toggleBold().run()"
        ></div>
        <div
          class="i-mdi-format-italic w-6 h-6"
          @click="editor.chain().focus().toggleItalic().run()"
        ></div>
      </div>

      <!-- <div class="border-r mx-2"></div> -->

      <!-- <div class="px-2"></div>
      <div class="i-dashicons-editor-ol w-6 h-6"></div>
      <div class="i-dashicons-editor-ul w-6 h-6"></div>
      <div class="px-2"></div>
      <div class="i-dashicons-editor-alignleft w-6 h-6"></div>
      <div class="i-dashicons-editor-aligncenter w-6 h-6"></div>
      <div class="i-dashicons-editor-alignright w-6 h-6"></div>
      <div class="px-2"></div>
      <div class="i-dashicons-admin-links w-6 h-6"></div>
      <div class="i-dashicons-format-image w-6 h-6"></div> -->
    </div>

    <div class="Editor">
      <EditorContent :editor="editor" />
    </div>

    <pre class="border rounded p-4">{{ editor.getHTML() }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.Editor {
  :deep(h1) {
    @apply text-3xl;
  }

  :deep(h2) {
    @apply text-2xl;
  }

  :deep(h3) {
    @apply text-xl;
  }

  :deep(h4) {
    @apply text-lg;
  }

  :deep(h5) {
    @apply text-md;
  }

  :deep(h6) {
    @apply text-sm;
  }
}
</style>
