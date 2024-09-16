<script lang="ts" setup>
import { XButton, useNotification } from '@x/ui';

const notification = useNotification();

let count = 0;

const push = () => {
  count += 1;

  notification.actions.add({
    message: `This is a test notification. (${count})`,
    color: 'secondary',
    icon: 'i-material-symbols-wifi-rounded',
  });
};
</script>

<template>
  <XButton @click="push">Push</XButton>
</template>
