<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Editor, EditorContent } from '@tiptap/vue-3';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

const editor = ref();

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link,
    ],
    content: `
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
    `,
    editorProps: {
      attributes: {
        class:
          'border border-slate-400 rounded px-3 py-2 min-h-65 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400',
      },
    },
  });
});

function addImage() {
  const url = window.prompt('URL');

  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
}

function setLink() {
  const previousUrl = editor.value.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) return;

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Editor' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Editor</div>
  </div>

  <div v-if="editor" class="space-y-4">
    <div class="flex">
      <div class="flex gap-1">
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

        <input
          type="color"
          :value="editor.getAttributes('textStyle').color"
          @input="
            editor
              .chain()
              .focus()
              .setColor(($event.target as HTMLInputElement)?.value)
              .run()
          "
        />
      </div>

      <div class="border-r mx-2"></div>

      <div class="flex gap-1">
        <div
          class="i-mdi-format-bold w-6 h-6"
          @click="editor.chain().focus().toggleBold().run()"
        ></div>
        <div
          class="i-mdi-format-italic w-6 h-6"
          @click="editor.chain().focus().toggleItalic().run()"
        ></div>
        <div
          class="i-mdi-format-underline w-6 h-6"
          @click="editor.chain().focus().toggleUnderline().run()"
        ></div>
        <div
          class="i-mdi-format-strikethrough-variant w-6 h-6"
          @click="editor.chain().focus().toggleStrike().run()"
        ></div>
      </div>

      <div class="border-r mx-2"></div>

      <div class="flex gap-1">
        <div
          class="i-mdi-format-list-bulleted w-6 h-6"
          @click="editor.chain().focus().toggleBulletList().run()"
        ></div>
        <div
          class="i-mdi-format-list-numbered w-6 h-6"
          @click="editor.chain().focus().toggleOrderedList().run()"
        ></div>
      </div>

      <div class="border-r mx-2"></div>

      <div class="flex gap-1">
        <div
          class="i-mdi-format-align-left w-6 h-6"
          @click="editor.chain().focus().setTextAlign('left').run()"
        ></div>
        <div
          class="i-mdi-format-align-center w-6 h-6"
          @click="editor.chain().focus().setTextAlign('center').run()"
        ></div>
        <div
          class="i-mdi-format-align-right w-6 h-6"
          @click="editor.chain().focus().setTextAlign('right').run()"
        ></div>
        <div
          class="i-mdi-format-align-justify w-6 h-6"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        ></div>
      </div>

      <div class="border-r mx-2"></div>

      <div class="flex gap-1">
        <div class="i-mdi-image-outline w-6 h-6" @click="addImage"></div>
        <div class="i-mdi-link w-6 h-6" @click="setLink"></div>
        <div
          class="i-mdi-format-quote-close w-6 h-6"
          @click="editor.chain().focus().toggleBlockquote().run()"
        ></div>
        <div
          class="i-mdi-code-tags w-6 h-6"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        ></div>
        <div
          class="i-mdi-border-horizontal w-6 h-6"
          @click="editor.chain().focus().setHorizontalRule().run()"
        ></div>
      </div>

      <div class="border-r mx-2"></div>

      <div class="flex gap-1">
        <div class="i-mdi-undo w-6 h-6" @click="editor.chain().focus().undo().run()"></div>
        <div class="i-mdi-redo w-6 h-6" @click="editor.chain().focus().redo().run()"></div>
      </div>
    </div>

    <div class="Editor">
      <EditorContent :editor="editor" />
    </div>

    <div class="border rounded p-4">{{ editor.getHTML() }}</div>
  </div>
</template>

<style lang="scss" scoped>
.Editor {
  :deep(h1) {
    @apply text-3xl sm:text-4xl font-extrabold;
  }

  :deep(h2) {
    @apply text-2xl sm:text-3xl font-bold;
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

  :deep(ul) {
    @apply list-disc ml-4;
  }

  :deep(ol) {
    @apply list-decimal ml-4;
  }

  :deep(blockquote) {
    @apply px-2 border-l-4 border-slate-500;
  }

  :deep(a) {
    @apply font-bold text-sm text-primary-500;
    @apply hover:underline hover:text-primary-600 dark:hover:text-primary-400;
  }

  :deep(pre) {
    @apply p-2 rounded bg-slate-700 text-white;
  }

  :deep(hr) {
    @apply my-2;
  }
}
</style>
