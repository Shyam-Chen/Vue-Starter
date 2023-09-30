<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';

const editor = ref();

function toggleBold() {
  editor.value.chain().focus().toggleBold().run();
}

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

  <div v-if="editor">
    <Button :class="{ 'is-active': editor.isActive('bold') }" @click="toggleBold">
      Toggle Bold
    </Button>

    <div>
      <div>Bold: {{ editor.isActive('bold') }}</div>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>
