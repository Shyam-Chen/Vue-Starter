<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XTextField, XLeaveConfirmation } from '@x/ui';

const initText = ref('');
const text = ref('');
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'ConfirmLeaveDialog' }]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">ConfirmLeaveDialog</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="text-xs mb-2">Input text triggers confirmation to leave the dialog.</div>
    <XTextField v-model:value="text" label="Label" />
  </div>

  <XLeaveConfirmation :trigger="initText !== text" />
</template>
