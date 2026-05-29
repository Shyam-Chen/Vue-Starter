<script lang="ts" setup>
import { useNotification, XBreadcrumb, XButton, XCard } from '@x/ui';
import { ref, useTemplateRef } from 'vue';

// ========== Simulate backend API postback ==========
type ResponseFile = {
  originalFilename: string;
  filename: string;
  mimetype: string;
  url: string;
};

function genFiles() {
  return [
    {
      originalFilename: 'example.csv',
      filename: 'example__22c57dd5-d83c-43a5-88d6-9f2ba85c87dd.csv',
      mimetype: 'text/csv',
      url: '/uploads/example__22c57dd5-d83c-43a5-88d6-9f2ba85c87dd.csv',
    },
    {
      originalFilename: 'example-2.csv',
      filename: 'example-2__6ea72f13-99c7-445a-8a46-b8c3d9d6096d.csv',
      mimetype: 'text/csv',
      url: '/uploads/example-2__6ea72f13-99c7-445a-8a46-b8c3d9d6096d.csv',
    },
  ];
}

// ========== Implementation of FileButton ==========
const notification = useNotification();

const fileButtonInput = useTemplateRef('fileButtonInput');
const loading = ref(false);
const uploadedFiles = ref<ResponseFile[]>([]);

async function upload(event: Event) {
  loading.value = true;

  const el = event.target as HTMLInputElement;
  const files = Array.from(el.files || []);

  if (!files?.length) return;

  const formData = new FormData();

  for (const file of files) {
    formData.append('files', file);
  }

  // const response = await request<ResponseFile[]>('/upload/multiple', { method: 'POST', body: formData });
  const response = { ok: true, _data: { files: genFiles() } };
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (response.ok) {
    uploadedFiles.value = [...(uploadedFiles.value || []), ...response._data.files];

    notification.actions.add({
      message: 'Uploaded successfully.',
      color: 'success',
    });
  }

  loading.value = false;
}

function download(file: ResponseFile) {
  const link = document.createElement('a');
  link.href = `${location.origin}${file.url}`;
  link.download = file.filename || '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Upload Files' },
      { text: 'FileButton' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">FileButton (WIP)</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="grid has-[.FileButton-FilesItem]:gap-4">
        <input ref="fileButtonInput" type="file" multiple class="hidden" @change="upload" />
        <XButton
          prepend="i-ic-outline-file-upload"
          label="Uploads"
          variant="outlined"
          :loading
          @click="fileButtonInput?.click()"
        />

        <div class="bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden">
          <ul class="divide-y divide-slate-200 dark:divide-slate-600">
            <li
              v-for="(file, fileIndex) in uploadedFiles"
              :key="fileIndex"
              class="FileButton-FilesItem p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition duration-150"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1 min-w-0">
                  <div
                    class="shrink-0 siz-10 bg-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <div class="i-ic-round-file-present size-6 text-blue-600"></div>
                  </div>

                  <div class="ms-4 flex-1 min-w-0">
                    <p class="text-sm font-medium truncate">
                      {{ file.filename }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2 ms-4">
                  <XButton
                    prepend="i-ic-outline-open-in-new"
                    label="Download"
                    variant="outlined"
                    size="small"
                    color="info"
                    @click="download(file)"
                  />
                  <XButton
                    prepend="i-ic-outline-delete"
                    label="Delete"
                    variant="outlined"
                    size="small"
                    color="danger"
                    @click="
                      () => {
                        const files = [...uploadedFiles];
                        files.splice(fileIndex, 1);
                        uploadedFiles = files;
                      }
                    "
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </XCard>
  </section>
</template>
