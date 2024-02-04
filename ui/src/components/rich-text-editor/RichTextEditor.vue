<script lang="ts" setup>
import type { Extensions } from '@tiptap/vue-3';
import { ref, computed, watch, onMounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

import Divider from '../divider/Divider.vue';
import Popover from '../popover/Popover.vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue?: string;
    extension?: Extensions;
    required?: boolean;
    disabled?: boolean;
    viewonly?: boolean;
  }>(),
  {
    label: '',
    modelValue: '',
    extension: () => [],
    required: false,
    disabled: false,
    viewonly: false,
  },
);

const emit = defineEmits<{
  (evt: 'update:modelValue', val: string): void;
}>();

const defaultModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const editor = ref<Editor>();

const editorClass = computed(() => {
  if (props.viewonly) {
    return 'rounded-b min-h-65';
  }

  return 'border border-slate-400 rounded-b px-3 py-2 min-h-65 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400 focus:rounded';
});

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled && !props.viewonly,
    extensions: [
      ...props.extension,
      Blockquote,
      Bold,
      BulletList,
      Color,
      Highlight.configure({ multicolor: true }),
      Document,
      Dropcursor,
      Gapcursor,
      HardBreak,
      Heading,
      History,
      HorizontalRule,
      Italic,
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
      TextStyle,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link,
    ],
    content: defaultModel.value,
    editorProps: {
      attributes: {
        class: editorClass.value,
      },
    },
    onUpdate({ editor }) {
      defaultModel.value = editor.getHTML();
    },
  });
});

watch(
  () => props.disabled,
  (val) => {
    editor.value?.setOptions({ editable: !val && !props.viewonly });
  },
);

function toggleHeading(level: 1 | 2 | 3 | 4) {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleHeading({ level }).run();
}

function setParagraph() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setParagraph().run();
}

function setColor(color: string) {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setColor(color).run();
}

function toggleHighlight(color: string) {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleHighlight({ color }).run();
}

function toggleBold() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleBold().run();
}

function toggleItalic() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleItalic().run();
}

function toggleUnderline() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleUnderline().run();
}

function toggleStrike() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleStrike().run();
}

function toggleBulletList() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleBulletList().run();
}

function toggleOrderedList() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleOrderedList().run();
}

function setTextAlign(alignment: 'left' | 'center' | 'right' | 'justify') {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setTextAlign(alignment).run();
}

function setImage() {
  if (props.disabled || props.viewonly) return;

  const url = window.prompt('URL');

  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run();
  }
}

function setLink() {
  if (props.disabled || props.viewonly) return;

  const previousUrl = editor.value?.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  if (url === null) return;

  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}

function toggleBlockquote() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleBlockquote().run();
}

// function toggleCodeBlock() {
//   if (props.disabled || props.viewonly) return;
//   editor.value?.chain().focus().toggleCodeBlock().run();
// }

function setHorizontalRule() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setHorizontalRule().run();
}

function undo() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().undo().run();
}

function redo() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().redo().run();
}

const completed = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    if (props.viewonly) {
      editor.value?.commands?.setContent(val);
    } else if (!completed.value) {
      completed.value = true;
      editor.value?.commands?.setContent(val);
    }
  },
);

defineExpose({
  editor,
});
</script>

<template>
  <div>
    <div class="RichTextEditor-Label">
      <template v-if="label">{{ label }}</template>
      <span v-if="required" class="text-red-500">*</span>
      <slot></slot>
    </div>

    <div v-if="editor" :class="[disabled ? 'opacity-60 cursor-not-allowed' : '']">
      <div
        v-if="!viewonly"
        class="flex flex-wrap px-2 py-1 border border-b-0 border-slate-400 rounded-t"
      >
        <div class="flex gap-1">
          <div class="i-mdi-format-paragraph w-6 h-6" @click="setParagraph"></div>
          <div class="i-mdi-format-header-1 w-6 h-6" @click="toggleHeading(1)"></div>
          <div class="i-mdi-format-header-2 w-6 h-6" @click="toggleHeading(2)"></div>
          <div class="i-mdi-format-header-3 w-6 h-6" @click="toggleHeading(3)"></div>
          <div class="i-mdi-format-header-4 w-6 h-6" @click="toggleHeading(4)"></div>

          <Popover :disabled="disabled">
            <div class="i-mdi-format-color-text w-6 h-6"></div>

            <template #content>
              <div class="p-4 grid grid-cols-5 md:grid-cols-10 gap-2">
                <div class="Color bg-black" @click="setColor('black')"></div>
                <div class="Color bg-white" @click="setColor('white')"></div>
                <div class="Color bg-gray-500" @click="setColor('#6b7280')"></div>
                <div class="Color bg-red-500" @click="setColor('#ef4444')"></div>
                <div class="Color bg-orange-500" @click="setColor('#f97316')"></div>
                <div class="Color bg-amber-500" @click="setColor('#f59e0b')"></div>
                <div class="Color bg-yellow-500" @click="setColor('#eab308')"></div>
                <div class="Color bg-lime-500" @click="setColor('#84cc16')"></div>
                <div class="Color bg-green-500" @click="setColor('#22c55e')"></div>
                <div class="Color bg-emerald-500" @click="setColor('#10b981')"></div>
                <div class="Color bg-teal-500" @click="setColor('#14b8a6')"></div>
                <div class="Color bg-cyan-500" @click="setColor('#06b6d4')"></div>
                <div class="Color bg-sky-500" @click="setColor('#0ea5e9')"></div>
                <div class="Color bg-blue-500" @click="setColor('#3b82f6')"></div>
                <div class="Color bg-indigo-500" @click="setColor('#6366f1')"></div>
                <div class="Color bg-violet-500" @click="setColor('#8b5cf6')"></div>
                <div class="Color bg-purple-500" @click="setColor('#a855f7')"></div>
                <div class="Color bg-fuchsia-500" @click="setColor('#d946ef')"></div>
                <div class="Color bg-pink-500" @click="setColor('#ec4899')"></div>
                <div class="Color bg-rose-500" @click="setColor('#f43f5e')"></div>
              </div>
            </template>
          </Popover>

          <Popover :disabled="disabled">
            <div class="i-mdi-format-color-fill w-6 h-6"></div>

            <template #content>
              <div class="p-4 grid grid-cols-5 md:grid-cols-10 gap-2">
                <div class="Color bg-black" @click="toggleHighlight('black')"></div>
                <div class="Color bg-white" @click="toggleHighlight('white')"></div>
                <div class="Color bg-gray-500" @click="toggleHighlight('#6b7280')"></div>
                <div class="Color bg-red-500" @click="toggleHighlight('#ef4444')"></div>
                <div class="Color bg-orange-500" @click="toggleHighlight('#f97316')"></div>
                <div class="Color bg-amber-500" @click="toggleHighlight('#f59e0b')"></div>
                <div class="Color bg-yellow-500" @click="toggleHighlight('#eab308')"></div>
                <div class="Color bg-lime-500" @click="toggleHighlight('#84cc16')"></div>
                <div class="Color bg-green-500" @click="toggleHighlight('#22c55e')"></div>
                <div class="Color bg-emerald-500" @click="toggleHighlight('#10b981')"></div>
                <div class="Color bg-teal-500" @click="toggleHighlight('#14b8a6')"></div>
                <div class="Color bg-cyan-500" @click="toggleHighlight('#06b6d4')"></div>
                <div class="Color bg-sky-500" @click="toggleHighlight('#0ea5e9')"></div>
                <div class="Color bg-blue-500" @click="toggleHighlight('#3b82f6')"></div>
                <div class="Color bg-indigo-500" @click="toggleHighlight('#6366f1')"></div>
                <div class="Color bg-violet-500" @click="toggleHighlight('#8b5cf6')"></div>
                <div class="Color bg-purple-500" @click="toggleHighlight('#a855f7')"></div>
                <div class="Color bg-fuchsia-500" @click="toggleHighlight('#d946ef')"></div>
                <div class="Color bg-pink-500" @click="toggleHighlight('#ec4899')"></div>
                <div class="Color bg-rose-500" @click="toggleHighlight('#f43f5e')"></div>
              </div>
            </template>
          </Popover>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div class="i-mdi-format-bold w-6 h-6" @click="toggleBold"></div>
          <div class="i-mdi-format-italic w-6 h-6" @click="toggleItalic"></div>
          <div class="i-mdi-format-underline w-6 h-6" @click="toggleUnderline"></div>
          <div class="i-mdi-format-strikethrough-variant w-6 h-6" @click="toggleStrike"></div>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div class="i-mdi-format-list-bulleted w-6 h-6" @click="toggleBulletList"></div>
          <div class="i-mdi-format-list-numbered w-6 h-6" @click="toggleOrderedList"></div>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div class="i-mdi-format-align-left w-6 h-6" @click="setTextAlign('left')"></div>
          <div class="i-mdi-format-align-center w-6 h-6" @click="setTextAlign('center')"></div>
          <div class="i-mdi-format-align-right w-6 h-6" @click="setTextAlign('right')"></div>
          <div class="i-mdi-format-align-justify w-6 h-6" @click="setTextAlign('justify')"></div>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div class="i-mdi-image-outline w-6 h-6" @click="setImage"></div>
          <div class="i-mdi-link w-6 h-6" @click="setLink"></div>
          <div class="i-mdi-format-quote-close w-6 h-6" @click="toggleBlockquote"></div>
          <!-- <div class="i-mdi-code-tags w-6 h-6" @click="toggleCodeBlock"></div> -->
          <div class="i-mdi-border-horizontal w-6 h-6" @click="setHorizontalRule"></div>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div class="i-mdi-undo w-6 h-6" @click="undo"></div>
          <div class="i-mdi-redo w-6 h-6" @click="redo"></div>
        </div>
      </div>

      <div class="RichTextEditor">
        <EditorContent :editor="editor" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.RichTextEditor-Label {
  @apply flex items-center text-sm font-bold mb-2 empty:hidden;
}

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
    @apply list-disc ml-6;
  }

  :deep(ol) {
    @apply list-decimal ml-6;
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
    @apply my-4;
  }
}

.Color {
  @apply w-5 h-5 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer;
}
</style>
