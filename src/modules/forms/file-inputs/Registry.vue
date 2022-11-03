<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import { useFetch } from '~/composables';

const fileUploadsApi = useFetch('/file-uploads', { immediate: false }).json();
const importDataApi = useFetch('/import-data', { immediate: false }).json();

const flux = reactive({
  async fileUploads(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('userfile', file);

    await fileUploadsApi.post(formData).execute();
  },
  async importData(event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('userfile', file);

    await importDataApi.post(formData).execute();
  },
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Forms', disabled: true },
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
      <input type="file" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Upload file to Cloudinary</div>

    <div class="flex justify-center">
      <input type="file" @change="flux.fileUploads" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Import data from Excel</div>

    <div class="flex justify-center">
      <input type="file" @change="flux.importData" />
    </div>
  </div>
</template>
