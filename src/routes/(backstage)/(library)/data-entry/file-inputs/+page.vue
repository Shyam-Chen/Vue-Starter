<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { XBreadcrumb, XFileInput, XDropzone } from '@x/ui';
import { request } from '@x/ui';

const flux = reactive({
  changeFile(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el?.files?.[0];
    console.log(file);
  },
  async fileUploads(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el?.files?.[0];

    const formData = new FormData();
    if (file) formData.append('userfile', file);

    await request('/file-uploads', {
      method: 'POST',
      body: formData,
    });
  },
  async importData(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el?.files?.[0];

    const formData = new FormData();
    if (file) formData.append('userfile', file);

    await request('/file-uploads/import-data', {
      method: 'POST',
      body: formData,
    });
  },
});

const fileList = ref<string[]>([]);
const dragover = ref(false);

function onDrop(evt: DragEvent) {
  dragover.value = false;

  const file = evt.dataTransfer?.files?.[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    // request('/path/to/upload-file', { method: 'POST', body: formData });
  }
}

function onChange(evt: Event) {
  const el = evt.target as HTMLInputElement;
  const file = el?.files?.[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    // request('/path/to/upload-file', { method: 'POST', body: formData });
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
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'File inputs' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">File inputs</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <XFileInput @change="flux.changeFile" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Multiple</div>

    <div class="flex justify-center">
      <XFileInput multiple />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center gap-4">
      <XFileInput disabled />
      <XFileInput multiple disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Upload file to Cloudinary</div>

    <div class="flex justify-center">
      <XFileInput @change="flux.fileUploads" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Import data from Excel</div>

    <div class="flex justify-center">
      <XFileInput @change="flux.importData" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Drag Zone</div>

    <XDropzone />

    <label
      class="Dropzone-Element"
      :class="{ 'important:bg-primary-200': dragover }"
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
      <div class="i-mdi-tray-arrow-up w-24 h-24 text-primary-500"></div>
      <div class="text-primary-700 text-2xl">Choose a file or drag it here.</div>
    </label>

    <div v-for="file in fileList" :key="file">
      {{ file }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Dropzone-Element {
  @apply w-full h-64 flex flex-col justify-center items-center cursor-pointer;
  @apply border-4 border-dashed border-primary-600 rounded bg-primary-200/75 hover:bg-primary-200;
}
</style>
