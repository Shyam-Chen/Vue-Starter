<script lang="ts" setup>
import { ref } from 'vue';
import useNotification from '../../composables/notification/useNotification';
import FormControl from '../form-control/FormControl.vue';
import Spinner from '../spinner/Spinner.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
  title?: string;
  limit?: (file: File) => string;
  loading?: boolean;
  uploaded?: boolean;
}>();

const emit = defineEmits<(evt: 'upload', file: File, formData: FormData) => void>();

const notification = useNotification();

const dragover = ref(false);
const fileInput = ref<HTMLInputElement>();

function fileLimit(file: File) {
  let message = '';

  if (!file.type.includes('image')) {
    message = `Only graphic file formats can be uploaded`;
  } else if (file.size > 100 * 1024) {
    message = `Do not upload more than 100 kB`;
  }

  if (message) {
    notification.actions.add({ message, color: 'danger' });
  }

  return message;
}

function onDrop(evt: DragEvent) {
  dragover.value = false;

  const file = evt.dataTransfer?.files?.[0];
  onUpload(file);
}

function onChange(evt: Event) {
  const el = evt.target as HTMLInputElement;
  const file = el?.files?.[0];
  onUpload(file);
}

function onUpload(file?: File) {
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
  <FormControl v-slot="{ id }" :label :required :invalid :help>
    <div v-if="loading" v-bind="$attrs" class="Dropzone">
      <Spinner />
    </div>

    <div v-else-if="uploaded" v-bind="$attrs" class="Dropzone" :class="{ uploaded }">
      <slot></slot>
    </div>

    <label
      v-else
      :for="id"
      v-bind="$attrs"
      class="Dropzone"
      :class="{ '!bg-slate-200/75 !dark:bg-slate-700/75': dragover, invalid }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <input
        :id
        ref="fileInput"
        type="file"
        class="hidden"
        @change="onChange"
        @click="fileInput && (fileInput.value = '')"
      />
      <slot name="placeholder">
        <div class="i-mdi-tray-arrow-up size-24"></div>
        <div class="text-xl">{{ title || 'Click or drag to upload image' }}</div>
      </slot>
    </label>
  </FormControl>
</template>

<style lang="scss" scoped>
.Dropzone {
  @apply flex flex-col justify-center items-center cursor-pointer;
  @apply border-4 border-dashed rounded border-slate-400/75 hover:border-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-200/75 dark:hover:bg-slate-700/75;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500/40 focus:border-red-500;
  }

  &.uploaded {
    @apply border-0 cursor-auto;
  }
}
</style>
