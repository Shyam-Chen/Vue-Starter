<script lang="ts" setup>
import type { Extensions } from '@tiptap/vue-3';
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { Extension } from '@tiptap/core';
import { Editor, EditorContent } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';

import FormControl from '../form-control/FormControl.vue';
import Button from '../button/Button.vue';

const defaultModel = defineModel<string>({ default: '' });

const props = withDefaults(
  defineProps<{
    label?: string;
    extension?: Extensions;
    required?: boolean;
    invalid?: boolean | string;
    help?: string;
    disabled?: boolean;
    viewonly?: boolean;
    class?: string;
    editing?: boolean;
    loading?: boolean;
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
    editing: false,
    loading: false,
  },
);

const emit = defineEmits<{
  (evt: 'send'): void;
}>();

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter() {
        emit('send');
        return true;
      },
    };
  },
});

const editor = ref<Editor>();

const editorClass = computed(() => {
  if (props.viewonly) {
    return `text-sm font-normal text-gray-900 dark:text-white`;
  }

  let clx = `border border-slate-400 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400 focus:rounded ${props.class}`;
  if (props.editing) clx += `px-3 py-1 min-h-38px`;
  else clx += `px-7 py-5 min-h-70px`;

  return clx;
});

const typing = ref(false);

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled && !props.viewonly,
    extensions: [
      ...props.extension,
      DisableEnter,
      Document,
      HardBreak,
      History,
      Paragraph,
      Text,
      Link,
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
  () => props.disabled,
  (val) => {
    editor.value?.setOptions({ editable: !val && !props.viewonly });
  },
);

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
  { immediate: true },
);

const flux = reactive({
  files: [] as File[],
  onChange(event: Event) {
    const el = event.target as HTMLInputElement;
    const files = Array.from(el.files || []);
    flux.files = [...flux.files, ...files];
  },
  onDelete(index: number) {
    const arr = [...flux.files];
    arr.splice(index, 1);
    flux.files = arr;
  },
});

defineExpose({
  editor,
});
</script>

<template>
  <FormControl :label :required :invalid :help>
    <div v-if="editor" class="w-full" :class="[disabled ? 'opacity-60 cursor-not-allowed' : '']">
      <div class="ChatBox">
        <EditorContent :editor="editor" />

        <template v-if="!editing && !viewonly">
          <div class="ChatBox-Attach">
            <Button
              icon="i-material-symbols-attach-file-add-rounded"
              variant="text"
              color="secondary"
              size="small"
              @click="($refs.fileInput as HTMLInputElement).click()"
            />

            <input
              ref="fileInput"
              type="file"
              :disabled="disabled"
              multiple
              class="hidden"
              @change="flux.onChange"
              @click="($refs.fileInput as HTMLInputElement).value = ''"
            />
          </div>

          <div class="ChatBox-Send">
            <Button icon="i-material-symbols-send-rounded" :loading @click="emit('send')" />
          </div>
        </template>
      </div>

      <div class="mt-1">
        <div v-for="(file, index) in flux.files" :key="index" class="flex items-center gap-2">
          {{ file.name }}
          <div
            class="i-material-symbols-delete-rounded size-5 cursor-pointer"
            @click="flux.onDelete(index)"
          ></div>
        </div>
      </div>
    </div>
  </FormControl>
</template>

<style lang="scss" scoped>
.ChatBox {
  @apply relative;

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

.dark .ChatBox {
  :deep(a) {
    @apply hover:text-primary-400;
  }

  :deep(hr) {
    @apply border-gray-700;
  }
}

.ChatBox-Attach {
  @apply absolute bottom-4.5 end-16;
}

.ChatBox-Send {
  @apply absolute bottom-4 end-4;
}
</style>
