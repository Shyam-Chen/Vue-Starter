<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Textarea from '~/components/Textarea.vue';

const flux = reactive({
  textarea1: '',
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Data Entry', disabled: true },
      { text: 'Textareas', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Textareas</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Textarea v-model:value="flux.textarea1" placeholder="Type here...">Example label</Textarea>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <Textarea v-model:value="flux.textarea1" placeholder="Type here..." disabled
        >Example label</Textarea
      >
    </div>
  </div>
</template>
