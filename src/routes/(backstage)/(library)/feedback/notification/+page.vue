<script lang="ts" setup>
import { ref } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';
import Notification from '~/components/Notification.vue';
import useNotification from '~/composables/useNotification';

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

let count3 = 0;

const notification = useNotification();

const push3 = () => {
  count3 += 1;
  notification.actions.add({ message: `This is a test notification. (${count3})` });
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
    <div class="mb-2">Multiple</div>

    <div class="flex gap-4">
      <Button @click="push2">Push</Button>
      <Notification ref="notify2" color="success" icon="i-mdi-checkbox-marked-circle-outline" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">useNotification</div>

    <div class="flex gap-4">
      <Button @click="push3">Push</Button>

      <Notification
        :messages="notification.state.messages"
        :timeouts="notification.state.timeouts"
        color="danger"
        icon="i-mdi-close-circle-outline"
      />
    </div>
  </div>
</template>
