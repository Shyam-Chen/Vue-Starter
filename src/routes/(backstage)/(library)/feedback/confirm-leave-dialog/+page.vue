<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import ConfirmLeaveDialog from '~/components/ConfirmLeaveDialog.vue';
import TextField from '~/components/TextField.vue';

const initText = ref('');
const text = ref('');
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'ConfirmLeaveDialog' }]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">ConfirmLeaveDialog</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="text-xs mb-2">Input text triggers confirmation to leave the dialog.</div>
    <TextField v-model:value="text" label="Label" />
  </div>

  <ConfirmLeaveDialog :trigger="initText !== text" />
</template>
