<script lang="ts" setup>
import type { Extensions } from '@tiptap/vue-3';
import { ref, computed, watch, onMounted } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { Extension } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import isMobile from 'is-mobile';

import Button from '../button/Button.vue';
import FormControl from '../form-control/FormControl.vue';

type ChatFile = File & { url?: string };

const defaultModel = defineModel<{ message: string; files: ChatFile[] }>({
  default: {
    message: '',
    files: [],
  },
});

const props = withDefaults(
  defineProps<{
    label?: string;
    extensions?: Extensions;
    required?: boolean;
    invalid?: boolean | string;
    help?: string;
    disabled?: boolean;
    viewonly?: boolean;
    class?: string;
    editing?: boolean;
    uploading?: boolean;
    loading?: boolean;
    self?: boolean;
    hideUploadButton?: boolean;
    stoppable?: boolean;
  }>(),
  {
    label: '',
    extensions: () => [],
    required: false,
    invalid: undefined,
    help: '',
    disabled: false,
    viewonly: false,
    class: '',
    editing: false,
    uploading: false,
    loading: false,
    self: false,
    hideUploadButton: false,
    stoppable: false,
  },
);

const emit = defineEmits<{
  (evt: 'uploadFiles', val: ChatFile[]): void;
  (evt: 'send'): void;
  (evt: 'stop'): void;
}>();

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter() {
        if (isMobile()) return false;

        if (!props.stoppable) {
          if (!props.loading) emit('send');
        } else if (!props.loading) {
          emit('send');
        }

        return true;
      },
    };
  },
});

const editor = ref<Editor>();
const fileInput = ref<HTMLInputElement>();

const editorClass = computed(() => {
  if (props.viewonly) return '';

  let clx = `focus:outline-none ${props.class}`;
  if (props.editing) clx += `p-4 min-h-13`;
  else clx += `${props.hideUploadButton ? 'ps-4 pe-12' : 'px-12'} py-3 min-h-13`;

  return clx;
});

const typing = ref(false);

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled && !props.viewonly && !props.loading,
    extensions: [
      ...props.extensions,
      DisableEnter,
      Document,
      HardBreak,
      History,
      Paragraph,
      Text,
      Link,
    ],
    content: defaultModel.value.message,
    editorProps: {
      attributes: {
        class: editorClass.value,
      },
    },
    onUpdate({ editor }) {
      typing.value = true;
      defaultModel.value.message = editor.getHTML();
    },
  });
});

watch(
  () => props.disabled,
  (val) => {
    editor.value?.setOptions({ editable: !val && !props.viewonly });
  },
);

const completed = ref(false);

watch(
  () => defaultModel.value.message,
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
  { immediate: true },
);

function onChange(event: Event) {
  const el = event.target as HTMLInputElement;
  const files = Array.from(el.files || []);
  emit('uploadFiles', files);
}

function onPreview(url?: string) {
  if (url) open(url, '_blank');
}

function onDelete(index: number) {
  const arr = [...defaultModel.value.files];
  arr.splice(index, 1);
  defaultModel.value.files = arr;
}

function isImageFileType(filename: string) {
  // prettier-ignore
  const validExtensions = ['.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp'];
  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return validExtensions.includes(extension);
}

defineExpose({
  editor,
});
</script>

<template>
  <FormControl :label :required :invalid :help>
    <div v-if="editor" class="w-full" :class="[disabled ? 'opacity-60 cursor-not-allowed' : '']">
      <div class="ChatBox" :class="{ viewonly }">
        <EditorContent :editor="editor" />

        <div v-if="defaultModel.files?.length" class="mt-1">
          <div
            class="flex items-center gap-4 px-4 pb-4"
            :class="{
              '!p-0 flex-col !items-start mt-4': viewonly,
              '!items-end': self,
              'flex-col !items-end': editing,
            }"
          >
            <div
              v-for="(file, index) in defaultModel.files"
              :key="index"
              class="bg-zinc-400 rounded-lg p-4 w-40 h-40"
            >
              <div class="relative">
                <img
                  v-if="isImageFileType(file.name)"
                  :src="file.url"
                  class="rounded-lg object-cover object-center w-32 h-25 hover:opacity-75 cursor-pointer"
                  @click.stop="onPreview(file.url)"
                />

                <div
                  v-else
                  class="i-material-symbols-file-present-outline-rounded w-32 h-25 hover:opacity-75 cursor-pointer text-zinc-50"
                  @click.stop="onPreview(file.url)"
                ></div>

                <div
                  v-if="!viewonly"
                  class="absolute -top-3 -right-3 z-1 size-6 bg-zinc-400 rounded-full"
                >
                  <div
                    class="i-material-symbols-cancel-rounded size-6 text-zinc-50 cursor-pointer"
                    @click.stop="onDelete(index)"
                  ></div>
                </div>
              </div>

              <div class="text-zinc-50 mt-1 truncate">{{ file.name }}</div>
            </div>
          </div>
        </div>

        <template v-if="!editing && !viewonly">
          <div class="ChatBox-Attach">
            <Button
              v-if="!hideUploadButton"
              icon="i-material-symbols-attach-file-add-rounded"
              variant="text"
              color="secondary"
              :loading="uploading"
              @click="fileInput?.click()"
            />

            <input
              ref="fileInput"
              type="file"
              :disabled="disabled"
              multiple
              class="hidden"
              @change="onChange"
              @click="fileInput && (fileInput.value = '')"
            />
          </div>

          <div class="ChatBox-Send">
            <Button
              :icon="
                !stoppable
                  ? 'i-material-symbols-send-rounded'
                  : loading
                    ? 'i-material-symbols-stop-rounded'
                    : 'i-material-symbols-send-rounded'
              "
              :loading="!stoppable ? loading : false"
              @click="!stoppable ? emit('send') : loading ? emit('stop') : emit('send')"
            />
          </div>
        </template>
      </div>
    </div>
  </FormControl>
</template>

<style lang="scss" scoped>
.ChatBox {
  @apply relative;
  @apply border border-slate-400 rounded-3xl;

  &.viewonly {
    @apply !border-0 !rounded-0;
  }

  :deep(p) {
    @apply my-1 leading-tight;
  }

  :deep(a) {
    @apply text-primary-500 hover:underline hover:text-primary-600;
  }
}

.dark .ChatBox {
  :deep(a) {
    @apply hover:text-primary-400;
  }
}

.ChatBox-Attach {
  @apply absolute top-7px start-2;
}

.ChatBox-Send {
  @apply absolute top-7px end-2;
}
</style>
