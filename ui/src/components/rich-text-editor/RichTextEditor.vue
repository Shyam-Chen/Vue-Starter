<script lang="ts" setup>
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import type { Extensions } from '@tiptap/vue-3';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { useFileDialog } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';

import Divider from '../divider/Divider.vue';
import FormControl from '../form-control/FormControl.vue';
import Listbox from '../listbox';
import Popover from '../popover/Popover.vue';

const defaultModel = defineModel<string>({ default: '' });

const props = withDefaults(
  defineProps<{
    label?: string;
    extension?: Extensions;
    required?: boolean;
    invalid?: string | boolean;
    help?: string;
    disabled?: boolean;
    viewonly?: boolean;
    class?: string;
  }>(),
  {
    label: '',
    extension: () => [],
    required: false,
    invalid: undefined,
    help: '',
    disabled: false,
    viewonly: false,
    class: '',
  },
);

const editor = ref<Editor>();

const editorClass = computed(() => {
  if (props.viewonly) return `min-h-54.5 ${props.class}`;
  const base = `border border-slate-500 dark:border-slate-400 rounded-b px-3 py-1 min-h-54.5`;
  const focus = `focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:rounded`;
  const invalid = `!border-red-500 !dark:border-red-500 !focus:ring-red-500/40 !focus:border-red-500`;
  return `${base} ${focus} ${props.invalid ? invalid : ''} ${props.class}`;
});

const typing = ref(false);

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled && !props.viewonly,
    extensions: [
      ...props.extension,
      Heading,
      Paragraph,
      Text,
      TextStyle,

      Color,
      Highlight.configure({ multicolor: true }),

      Bold,
      Italic,
      Underline,
      Strike,

      ListItem,
      BulletList,
      OrderedList,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),

      Image.configure({ allowBase64: true }),
      Link,
      Blockquote,
      HorizontalRule,

      Document,
      Dropcursor,
      Gapcursor,
      HardBreak,
      History,
    ],
    content: defaultModel.value,
    editorProps: {
      attributes: {
        class: editorClass.value,
      },
    },
    onUpdate({ editor }) {
      typing.value = true;
      defaultModel.value = editor.getHTML();
    },
  });
});

watch(
  () => props.invalid,
  () => {
    editor.value?.setOptions({ editorProps: { attributes: { class: editorClass.value } } });
  },
);

watch(
  () => props.disabled,
  (val) => {
    editor.value?.setOptions({ editable: !val && !props.viewonly });
  },
);

const textPopover = ref(false);

function toggleHeading(level: 3 | 4) {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleHeading({ level }).run();
  textPopover.value = false;
}

function setParagraph() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setParagraph().run();
  textPopover.value = false;
}

function setColor(color: string) {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setColor(color).run();
}

function toggleHighlight(color: string) {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().toggleHighlight({ color }).run();
}

function unset() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().unsetColor().unsetHighlight().run();
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

const { open, onChange } = useFileDialog({ accept: 'image/*', reset: true });

async function setImage() {
  if (props.disabled || props.viewonly) return;
  open();
}

onChange((files) => {
  if (!files?.length) return;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const el = event.target;

    if (el) {
      const base64String = el.result as string;
      editor.value?.chain().focus().setImage({ src: base64String }).run();
      editor.value?.chain().focus().createParagraphNear().run();
    }
  };

  reader.readAsDataURL(file);
});

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

function setHorizontalRule() {
  if (props.disabled || props.viewonly) return;
  editor.value?.chain().focus().setHorizontalRule().run();
}

const completed = ref(false);

watch(
  () => defaultModel.value,
  (val) => {
    if (props.viewonly) {
      editor.value?.commands?.setContent(val);
    } else if (!completed.value) {
      completed.value = true;
      editor.value?.commands?.setContent(val);
    } else {
      if (!typing.value) editor.value?.commands?.setContent(val);
      typing.value = false;
    }
  },
);

defineExpose({
  editor,
});
</script>

<template>
  <FormControl :label :required :invalid :help>
    <div v-if="editor" class="w-full" :class="[disabled ? 'opacity-60 cursor-not-allowed' : '']">
      <div
        v-if="!viewonly"
        class="flex flex-wrap px-2 py-1 border border-b-0 border-slate-400 rounded-t"
      >
        <div class="flex gap-1">
          <Popover v-model="textPopover" :disabled>
            <div class="flex items-center cursor-pointer" @click="textPopover = true">
              <div
                v-if="editor.isActive('heading', { level: 3 })"
                :class="{ 'text-primary-500': editor.isFocused }"
              >
                Heading
              </div>
              <div
                v-else-if="editor.isActive('heading', { level: 4 })"
                :class="{ 'text-primary-500': editor.isFocused }"
              >
                Subheading
              </div>
              <div v-else :class="{ 'text-primary-500': editor.isFocused }">Normal</div>
              <div
                class="i-material-symbols-arrow-drop-down-rounded size-5"
                :class="{ 'text-primary-500': editor.isFocused }"
              ></div>
            </div>

            <template #content>
              <Listbox>
                <Listbox.Item class="text-2xl font-semibold" @click="toggleHeading(3)">
                  Heading
                </Listbox.Item>
                <Listbox.Item class="text-xl font-medium" @click="toggleHeading(4)">
                  Subheading
                </Listbox.Item>
                <Listbox.Item class="leading-tight" @click="setParagraph">Normal</Listbox.Item>
              </Listbox>
            </template>
          </Popover>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <Popover :disabled>
            <div class="i-material-symbols-format-color-text-rounded size-5 cursor-pointer"></div>

            <template #content>
              <div class="p-4 grid grid-cols-5 gap-2">
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

          <Popover :disabled>
            <div class="i-material-symbols-format-color-fill-rounded size-5 cursor-pointer"></div>

            <template #content>
              <div class="p-4 grid grid-cols-5 gap-2">
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

          <div
            class="i-material-symbols-format-clear-rounded size-5 cursor-pointer"
            @click="unset"
          ></div>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div
            class="i-material-symbols-format-bold-rounded size-6 cursor-pointer"
            :class="{ 'text-primary-500': editor.isActive('bold') && editor.isFocused }"
            @click="toggleBold"
          ></div>
          <div
            class="i-material-symbols-format-italic-rounded size-6 cursor-pointer"
            :class="{ 'text-primary-500': editor.isActive('italic') && editor.isFocused }"
            @click="toggleItalic"
          ></div>
          <div
            class="i-material-symbols-format-underlined-rounded size-6 cursor-pointer"
            :class="{ 'text-primary-500': editor.isActive('underline') && editor.isFocused }"
            @click="toggleUnderline"
          ></div>
          <div
            class="i-material-symbols-strikethrough-s-rounded size-6 cursor-pointer"
            :class="{ 'text-primary-500': editor.isActive('strike') && editor.isFocused }"
            @click="toggleStrike"
          ></div>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div
            class="i-material-symbols-format-list-bulleted-rounded size-6 cursor-pointer"
            @click="toggleBulletList"
          ></div>
          <div
            class="i-material-symbols-format-list-numbered-rounded size-6 cursor-pointer"
            @click="toggleOrderedList"
          ></div>

          <Popover :disabled>
            <div
              class="size-6 cursor-pointer"
              :class="{
                'i-material-symbols-format-align-left-rounded': editor.isActive({
                  textAlign: 'left',
                }),
                'i-material-symbols-format-align-center-rounded': editor.isActive({
                  textAlign: 'center',
                }),
                'i-material-symbols-format-align-right-rounded': editor.isActive({
                  textAlign: 'right',
                }),
                'i-material-symbols-format-align-justify-rounded': editor.isActive({
                  textAlign: 'justify',
                }),
              }"
            ></div>

            <template #content>
              <Listbox>
                <Listbox.Item @click="setTextAlign('left')">
                  <div class="i-material-symbols-format-align-left-rounded size-6"></div>
                </Listbox.Item>
                <Listbox.Item @click="setTextAlign('center')">
                  <div class="i-material-symbols-format-align-center-rounded size-6"></div>
                </Listbox.Item>
                <Listbox.Item @click="setTextAlign('right')">
                  <div class="i-material-symbols-format-align-right-rounded size-6"></div>
                </Listbox.Item>
                <Listbox.Item @click="setTextAlign('justify')">
                  <div class="i-material-symbols-format-align-justify-rounded size-6"></div>
                </Listbox.Item>
              </Listbox>
            </template>
          </Popover>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <div
            class="i-material-symbols-imagesmode-outline-rounded size-6 cursor-pointer"
            @click="setImage"
          ></div>
          <div class="i-material-symbols-link-rounded size-6 cursor-pointer" @click="setLink"></div>
          <div
            class="i-material-symbols-format-quote-rounded size-6 cursor-pointer"
            @click="toggleBlockquote"
          ></div>
          <div
            class="i-material-symbols-border-horizontal-rounded size-6 cursor-pointer"
            @click="setHorizontalRule"
          ></div>
        </div>
      </div>

      <div class="RichTextEditor">
        <EditorContent :editor="editor" />
      </div>
    </div>
  </FormControl>
</template>

<style lang="scss" scoped>
.RichTextEditor {
  :deep(p) {
    @apply my-1 leading-tight;
  }

  :deep(h1) {
    @apply my-1 text-4xl font-extrabold;
  }

  :deep(h2) {
    @apply my-1 text-3xl font-bold;
  }

  :deep(h3) {
    @apply my-1 text-2xl font-semibold;
  }

  :deep(h4) {
    @apply my-1 text-xl font-medium;
  }

  :deep(ul) {
    @apply my-1 list-disc ml-6;
  }

  :deep(ol) {
    @apply my-1 list-decimal ml-6;
  }

  :deep(blockquote) {
    @apply my-1 px-2 border-l-4 border-slate-500;
  }

  :deep(a) {
    @apply text-primary-500 hover:underline hover:text-primary-600;
  }

  :deep(img) {
    @apply my-1;
  }

  :deep(hr) {
    @apply my-4 border-t border-gray-200;
  }
}

.dark .RichTextEditor {
  :deep(a) {
    @apply hover:text-primary-400;
  }

  :deep(hr) {
    @apply border-gray-700;
  }
}

.Color {
  @apply w-5 h-5 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer;
}
</style>
