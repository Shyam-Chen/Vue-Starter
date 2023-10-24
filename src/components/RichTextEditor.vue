<script lang="ts" setup>
import type { Extensions } from '@tiptap/vue-3';
import { ref, watch, computed, onMounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    extension?: Extensions;
    disabled?: boolean;
  }>(),
  {
    modelValue: '',
    extension: () => [],
    disabled: false,
  },
);

const emit = defineEmits<{
  (evt: 'update:modelValue', val: string): void;
}>();

const contentValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const editor = ref();

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled,
    extensions: [
      ...props.extension,
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
    content: contentValue.value,
    editorProps: {
      attributes: {
        class:
          'border border-slate-400 rounded-b px-3 py-2 min-h-65 focus:outline-none focus:ring-1 focus:ring-primary-400 focus:border-primary-400 focus:rounded',
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

  if (url === null) return;

  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}

watch(
  () => editor.value?.getHTML(),
  (val) => {
    contentValue.value = val;
  },
);

const completed = ref(false);

watch(
  () => contentValue.value,
  (val) => {
    if (val !== '<p></p>' && !completed.value) {
      completed.value = true;
      editor.value?.commands?.setContent(val);
    }
  },
);

function rgbToHex(rgb: string) {
  if (!rgb) return '#000000';

  const values = rgb.match(/\d+/g);

  if (values) {
    const r = parseInt(values[0]);
    const g = parseInt(values[1]);
    const b = parseInt(values[2]);

    const hex = '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);

    return hex;
  }

  return '#000000';
}
</script>

<template>
  <div v-if="editor" :class="[disabled ? 'opacity-60 cursor-not-allowed' : '']">
    <div class="flex px-2 py-1 border border-b-0 border-slate-400 rounded-t">
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
          class="i-mdi-format-paragraph w-6 h-6"
          @click="editor.chain().focus().setParagraph().run()"
        ></div>

        <input
          type="color"
          :value="rgbToHex(editor.getAttributes('textStyle').color)"
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

    <div class="RichTextEditor">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.RichTextEditor {
  :deep(p) {
    @apply my-2 leading-tight;
  }

  :deep(h1) {
    @apply text-4xl font-extrabold;
  }

  :deep(h2) {
    @apply text-3xl font-bold;
  }

  :deep(h3) {
    @apply text-2xl font-semibold;
  }

  :deep(h4) {
    @apply text-xl font-medium;
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
