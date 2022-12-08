<script lang="ts" setup>
import { reactive } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
import Dialog from '~/components/Dialog.vue';

const flux = reactive({
  launch() {
    flux.dialog = true;
  },
  dialog: false,
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Feedback', disabled: true },
      { text: 'Dialogs', disabled: true },
    ]"
    class="mb-4"
  />

  <div class="mb-4">
    <div class="text-3xl font-bold">Dialogs</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic examples</div>

    <div class="flex justify-center">
      <Button color="primary" @click="flux.launch">Launch</Button>

      <Dialog v-model="flux.dialog">
        <div>xxxx</div>
      </Dialog>
    </div>
  </div>
</template>
