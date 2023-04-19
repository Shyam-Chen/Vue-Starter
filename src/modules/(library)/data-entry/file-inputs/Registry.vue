<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import FileInput from '~/components/FileInput.vue';
import { useFetch } from '~/composables';

const fileUploadsApi = useFetch('/file-uploads').json();
const importDataApi = useFetch('/import-data').json();

const flux = reactive({
  async fileUploads(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el?.files?.[0];

    const formData = new FormData();
    if (file) formData.append('userfile', file);

    await fileUploadsApi.post(formData).execute();
  },
  async importData(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el?.files?.[0];

    const formData = new FormData();
    if (file) formData.append('userfile', file);

    await importDataApi.post(formData).execute();
  },
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Library', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'File inputs', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">File inputs</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <FileInput />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Multiple</div>

    <div class="flex justify-center">
      <FileInput multiple />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center gap-4">
      <FileInput disabled />
      <FileInput multiple disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Upload file to Cloudinary</div>

    <div class="flex justify-center">
      <FileInput @change="flux.fileUploads" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Import data from Excel</div>

    <div class="flex justify-center">
      <FileInput @change="flux.importData" />
    </div>
  </div>
</template>
