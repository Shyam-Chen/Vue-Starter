<script lang="ts" setup>
import { XBreadcrumb, XButton, XCard, XDropzone } from '@x/ui';
import { ref } from 'vue';

const loading = ref(false);
const uploaded = ref('');

async function onUpload(file: File) {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => (uploaded.value = fileReader.result as string);
}
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Upload Files' },
      { text: 'Dropzone' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">Dropzone</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XDropzone
        label="Example label"
        :loading
        :uploaded="!!uploaded"
        class="aspect-square h-64 md:h-75"
        @upload="onUpload"
      >
        <div
          class="w-full h-full bg-center bg-no-repeat bg-cover rounded-md relative"
          :style="{ 'background-image': `url(${uploaded})` }"
        >
          <div class="absolute top-1 right-1">
            <XButton
              icon="i-material-symbols-close-rounded"
              color="secondary"
              variant="outlined"
              size="small"
              @click="uploaded = ''"
            />
          </div>
        </div>
      </XDropzone>
    </XCard>
  </section>
</template>
