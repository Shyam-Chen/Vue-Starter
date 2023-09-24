<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';

import Notification from '~/components/Notification.vue';

const notify = ref();

let count = 0;

const push = () => {
  count += 1;
  notify.value.push({ message: `This is a test notification. (${count})` });
};

const notify2 = ref();

let count2 = 0;

const push2 = () => {
  count2 += 1;
  notify2.value.push({ message: `This is a test notification. (${count2})` });
};
</script>

<template>
  <Breadcrumbs :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'Notification' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">Notification</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex gap-4">
      <Button @click="push">Push</Button>
      <Notification ref="notify" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Info</div>

    <div class="flex gap-4">
      <Button @click="push2">Push</Button>
      <Notification ref="notify2" color="info" icon="i-mdi-information" />
    </div>
  </div>
</template>
