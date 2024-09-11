<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XCard, XFileInput } from '@x/ui';
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
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Upload Files' },
      { text: 'FileInput' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">FileInput</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XFileInput label="Example label" @change="flux.changeFile" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Multiple</h2>

    <XCard>
      <XFileInput label="Example label" multiple />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Disabled</h2>

    <XCard>
      <XFileInput label="Example label" disabled />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Upload file to Cloudinary</h2>

    <XCard>
      <XFileInput label="Example label" @change="flux.fileUploads" />
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Import data from Excel</h2>

    <XCard>
      <XFileInput label="Example label" @change="flux.importData" />
    </XCard>
  </section>
</template>
