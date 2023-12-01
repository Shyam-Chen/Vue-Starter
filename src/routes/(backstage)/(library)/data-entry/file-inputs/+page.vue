<script lang="ts" setup>
import { reactive } from 'vue';
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
  </div>
</template>
