<script lang="ts" setup>
import { useNotification, XButton } from '@x/ui';

const notification = useNotification();

let count = 0;

const push = () => {
  count += 1;
  notification.actions.add({ message: `This is a test notification. (${count})` });
};
</script>

<template>
  <XButton @click="push">Push</XButton>
</template>
