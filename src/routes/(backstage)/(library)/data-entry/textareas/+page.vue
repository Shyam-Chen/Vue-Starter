<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XTextarea } from '@x/ui';

const flux = reactive({
  textarea1: '',
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Data Entry' }, { text: 'Textarea' }]" />

  <div class="myb-4">
    <div class="text-3xl font-bold">Textarea</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XTextarea v-model:value="flux.textarea1" placeholder="Type here...">Example label</XTextarea>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Required</div>

    <div class="flex justify-center">
      <XTextarea v-model:value="flux.textarea1" placeholder="Type here..." required>
        Example label
      </XTextarea>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <XTextarea v-model:value="flux.textarea1" placeholder="Type here..." disabled>
        Example label
      </XTextarea>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Read Only</div>

    <div class="flex justify-center">
      <XTextarea v-model:value="flux.textarea1" placeholder="Type here..." readonly>
        Example label
      </XTextarea>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Error</div>

    <div class="flex justify-center">
      <XTextarea
        v-model:value="flux.textarea1"
        label="Example label"
        placeholder="Type here..."
        :errorMessage="'Incorrect entry.'"
      />
    </div>
  </div>
</template>
