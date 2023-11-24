<script lang="ts" setup>
import { ref } from 'vue';

import useNotification from '../../composables/notification/useNotification';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  invalid?: string | boolean;
  title?: string;
  limit?: (file: File) => string;
}>();

const emit = defineEmits<{
  (evt: 'upload', file: File, formData: FormData): void;
}>();

const notification = useNotification();

const dragover = ref(false);

function fileLimit(file: File) {
  let message = '';

  if (!file.type.includes('image')) {
    message = `Only graphic file formats can be uploaded`;
  } else if (file.size > 100 * 1024) {
    message = `Do not upload more than 100 kB`;
  }

  if (message) {
    notification.actions.add({
      message,
      color: 'danger',
      icon: 'i-mdi-close-circle-outline',
    });
  }

  return message;
}

function onDrop(evt: DragEvent) {
  dragover.value = false;

  const file = evt.dataTransfer?.files?.[0];

  if (file) {
    if (typeof props.limit === 'function' ? props.limit(file) : fileLimit(file)) return;

    const formData = new FormData();
    formData.append('file', file);
    emit('upload', file, formData);
  }
}

function onChange(evt: Event) {
  const el = evt.target as HTMLInputElement;
  const file = el?.files?.[0];

  if (file) {
    if (typeof props.limit === 'function' ? props.limit(file) : fileLimit(file)) return;

    const formData = new FormData();
    formData.append('file', file);
    emit('upload', file, formData);
  }
}

function onDragOver() {
  dragover.value = true;
}

function onDragLeave() {
  dragover.value = false;
}
</script>

<template>
  <div>
    <label
      v-bind="$attrs"
      class="Dropzone"
      :class="{ 'important:bg-slate-200': dragover }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <input
        ref="dropzone"
        type="file"
        class="hidden"
        @change="onChange"
        @click="($refs.dropzone as HTMLInputElement).value = ''"
      />
      <div class="i-mdi-tray-arrow-up w-24 h-24"></div>
      <div class="text-xl">{{ title || 'Click or drag to upload image' }}</div>
    </label>

    <div v-if="invalid" class="text-red-500 text-sm mt-1">
      {{ invalid }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Dropzone {
  @apply w-369.78px h-52 flex flex-col justify-center items-center cursor-pointer;
  @apply border-4 border-dashed rounded border-slate-400/75 hover:border-slate-400 bg-white hover:bg-slate-200/75;
}
</style>
