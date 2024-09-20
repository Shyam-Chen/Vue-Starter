<script lang="ts" setup>
import type { Extensions } from '@tiptap/vue-3';
import { ref, computed, watch, onMounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
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
import { useFileDialog } from '@vueuse/core';

import Divider from '../divider/Divider.vue';
import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';
import Listbox from '../listbox';
import Popover from '../popover/Popover.vue';
import Tooltip from '../tooltip/Tooltip.vue';

const defaultModel = defineModel<string>({ default: '' });

const props = withDefaults(
  defineProps<
    {
      extension?: Extensions;
      disabled?: boolean;
      readonly?: boolean;
      viewonly?: boolean;
      class?: string;
    } & FormControlProps
  >(),
  {
    extension: () => [],
    disabled: false,
    readonly: false,
    viewonly: false,
    class: '',
    ...formControlDefaults,
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

const my1 = `margin-top: 0.25rem; margin-bottom: 0.25rem;`;

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled && !props.readonly && !props.viewonly,
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

      Image.configure({ allowBase64: true }).extend({
        addAttributes() {
          return {
            src: {
              default: null,
            },
            alt: {
              default: null,
            },
            style: {
              default: `${my1} width: auto; height: auto;`,
              parseHTML: (element) => {
                const width = element.getAttribute('width');

                return width
                  ? `${my1} width: ${width}px; height: auto;`
                  : `${my1} ${element.style.cssText}`;
              },
            },
            title: {
              default: null,
            },
            loading: {
              default: null,
            },
            srcset: {
              default: null,
            },
            sizes: {
              default: null,
            },
            crossorigin: {
              default: null,
            },
            usemap: {
              default: null,
            },
            ismap: {
              default: null,
            },
            width: {
              default: null,
            },
            height: {
              default: null,
            },
            referrerpolicy: {
              default: null,
            },
            longdesc: {
              default: null,
            },
            decoding: {
              default: null,
            },
            class: {
              default: null,
            },
            id: {
              default: null,
            },
            name: {
              default: null,
            },
            draggable: {
              default: true,
            },
            tabindex: {
              default: null,
            },
            'aria-label': {
              default: null,
            },
            'aria-labelledby': {
              default: null,
            },
            'aria-describedby': {
              default: null,
            },
          };
        },
        addNodeView() {
          return ({ node, editor, getPos }) => {
            const {
              view,
              options: { editable },
            } = editor;

            const { style } = node.attrs;
            const $wrapper = document.createElement('div');
            const $container = document.createElement('div');
            const $img = document.createElement('img');

            const dispatchNodeView = () => {
              if (typeof getPos === 'function') {
                // Add back the `my-1` class after finishing the image adjustment
                $img.style.marginTop = '0.25rem';
                $img.style.marginBottom = '0.25rem';

                const newAttrs = {
                  ...node.attrs,
                  style: `${$img.style.cssText}`,
                };

                view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
              }
            };

            $wrapper.setAttribute('style', `display: flex;`);
            $wrapper.appendChild($container);

            $container.setAttribute('style', `${style}`);
            $container.appendChild($img);

            Object.entries(node.attrs).forEach(([key, value]) => {
              if (value === undefined || value === null) return;
              if (key === 'style') return; // Do not apply the wrapper styles to the `img` tag
              $img.setAttribute(key, value);
            });

            if (!editable) return { dom: $wrapper };

            const dotsPosition = [
              'top: -4px; left: -4px; cursor: nwse-resize;',
              'top: -4px; right: -4px; cursor: nesw-resize;',
              'bottom: -4px; left: -4px; cursor: nesw-resize;',
              'bottom: -4px; right: -4px; cursor: nwse-resize;',
            ];

            let isResizing = false;
            let startX: number, startWidth: number;

            const resizerColor = `#71717a`;
            const resizerBorder = `border: 1px dashed ${resizerColor};`;
            const resizerDot = `width: 8px; height: 8px; border: 2px solid ${resizerColor}; border-radius: 50%;`;

            function cleanDots() {
              if ($container.childElementCount > 2) {
                for (let i = 0; i < dotsPosition.length; i++) {
                  $container.removeChild($container.lastChild as Node);
                }
              }
            }

            $container.addEventListener('click', () => {
              cleanDots();

              $container.setAttribute(
                'style',
                `${my1}; position: relative; ${resizerBorder} ${style}`,
              );

              Array.from({ length: 4 }, (_, index) => {
                const $dot = document.createElement('div');

                $dot.setAttribute(
                  'style',
                  `position: absolute; ${resizerDot} ${dotsPosition[index]}`,
                );

                $dot.addEventListener('mousedown', (e) => {
                  e.preventDefault();
                  isResizing = true;
                  startX = e.clientX;
                  startWidth = $container.offsetWidth;

                  const onMouseMove = (e: MouseEvent) => {
                    if (!isResizing) return;
                    const deltaX = index % 2 === 0 ? -(e.clientX - startX) : e.clientX - startX;
                    const newWidth = startWidth + deltaX;
                    $container.style.width = newWidth + 'px';
                    $img.style.width = newWidth + 'px';
                  };

                  const onMouseUp = () => {
                    if (isResizing) isResizing = false;

                    dispatchNodeView();

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                });

                $container.appendChild($dot);
              });
            });

            document.addEventListener('click', (e: MouseEvent) => {
              const $target = e.target as HTMLElement;
              const isClickInside = $container.contains($target);

              if (!isClickInside) {
                const containerStyle = $container.getAttribute('style');
                const newStyle = containerStyle?.replace(resizerBorder, '');
                $container.setAttribute('style', newStyle as string);
                cleanDots();
              }
            });

            return { dom: $wrapper };
          };
        },
      }),
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
    editor.value?.setOptions({ editable: !val && !props.readonly && !props.viewonly });
  },
);

const editable = computed(() => !props.disabled && !props.readonly && !props.viewonly);

const textPopover = ref(false);

function toggleHeading(level: 3 | 4) {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleHeading({ level }).run();
  textPopover.value = false;
}

function setParagraph() {
  if (!editable.value) return;
  editor.value?.chain().focus().setParagraph().run();
  textPopover.value = false;
}

function setColor(color: string) {
  if (!editable.value) return;
  editor.value?.chain().focus().setColor(color).run();
}

function toggleHighlight(color: string) {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleHighlight({ color }).run();
}

function unset() {
  if (!editable.value) return;
  editor.value?.chain().focus().unsetColor().unsetHighlight().run();
}

function toggleBold() {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleBold().run();
}

function toggleItalic() {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleItalic().run();
}

function toggleUnderline() {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleUnderline().run();
}

function toggleStrike() {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleStrike().run();
}

function toggleBulletList() {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleBulletList().run();
}

function toggleOrderedList() {
  if (!editable.value) return;
  editor.value?.chain().focus().toggleOrderedList().run();
}

function setTextAlign(alignment: 'left' | 'center' | 'right' | 'justify') {
  if (!editable.value) return;
  editor.value?.chain().focus().setTextAlign(alignment).run();
}

const { open, onChange } = useFileDialog({ accept: 'image/*', reset: true });

async function setImage() {
  if (!editable.value) return;
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
  if (!editable.value) return;

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
  if (!editable.value) return;
  editor.value?.chain().focus().toggleBlockquote().run();
}

function setHorizontalRule() {
  if (!editable.value) return;
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
          <Popover v-model="textPopover" :disabled="!editable">
            <div class="flex items-center cursor-pointer" @click="editable && (textPopover = true)">
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
          <Popover :disabled="!editable">
            <Tooltip title="Text Color" delay="500">
              <div class="i-material-symbols-format-color-text-rounded size-5 cursor-pointer"></div>
            </Tooltip>

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

          <Popover :disabled="!editable">
            <Tooltip title="Text Highlight Color" delay="500">
              <div class="i-material-symbols-format-color-fill-rounded size-5 cursor-pointer"></div>
            </Tooltip>

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

          <Tooltip title="Clear All Color" delay="500">
            <div
              class="i-material-symbols-format-clear-rounded size-5 cursor-pointer"
              @click="unset"
            ></div>
          </Tooltip>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <Tooltip title="Bold" delay="500">
            <div
              class="i-material-symbols-format-bold-rounded size-6 cursor-pointer"
              :class="{ 'text-primary-500': editor.isActive('bold') && editor.isFocused }"
              @click="toggleBold"
            ></div>
          </Tooltip>
          <Tooltip title="Italic" delay="500">
            <div
              class="i-material-symbols-format-italic-rounded size-6 cursor-pointer"
              :class="{ 'text-primary-500': editor.isActive('italic') && editor.isFocused }"
              @click="toggleItalic"
            ></div>
          </Tooltip>
          <Tooltip title="Underline" delay="500">
            <div
              class="i-material-symbols-format-underlined-rounded size-6 cursor-pointer"
              :class="{ 'text-primary-500': editor.isActive('underline') && editor.isFocused }"
              @click="toggleUnderline"
            ></div>
          </Tooltip>
          <Tooltip title="Strikethrough" delay="500">
            <div
              class="i-material-symbols-strikethrough-s-rounded size-6 cursor-pointer"
              :class="{ 'text-primary-500': editor.isActive('strike') && editor.isFocused }"
              @click="toggleStrike"
            ></div>
          </Tooltip>
        </div>

        <Divider orientation="vertical" class="!mx-2" />

        <div class="flex gap-1">
          <Tooltip title="Bullets" delay="500">
            <div
              class="i-material-symbols-format-list-bulleted-rounded size-6 cursor-pointer"
              @click="toggleBulletList"
            ></div>
          </Tooltip>
          <Tooltip title="Numbering" delay="500">
            <div
              class="i-material-symbols-format-list-numbered-rounded size-6 cursor-pointer"
              @click="toggleOrderedList"
            ></div>
          </Tooltip>

          <Popover :disabled="!editable">
            <Tooltip title="Align" delay="500">
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
            </Tooltip>

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
          <Tooltip title="Image" delay="500">
            <div
              class="i-material-symbols-imagesmode-outline-rounded size-6 cursor-pointer"
              @click="setImage"
            ></div>
          </Tooltip>
          <Tooltip title="Link" delay="500">
            <div
              class="i-material-symbols-link-rounded size-6 cursor-pointer"
              @click="setLink"
            ></div>
          </Tooltip>
          <Tooltip title="Quote" delay="500">
            <div
              class="i-material-symbols-format-quote-rounded size-6 cursor-pointer"
              @click="toggleBlockquote"
            ></div>
          </Tooltip>
          <Tooltip title="Divider" delay="500">
            <div
              class="i-material-symbols-border-horizontal-rounded size-6 cursor-pointer"
              @click="setHorizontalRule"
            ></div>
          </Tooltip>
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
    @apply w-full;
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
