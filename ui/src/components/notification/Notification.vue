<script lang="ts" setup>
import Toast from './Toast.vue';
import useNotification from '../../composables/notification/useNotification';

const notification = useNotification();
</script>

<template>
  <Teleport to="body">
    <div
      class="grid gap-4 fixed left-1/2 top-12 -translate-x-1/2 z-200 w-full px-4 md:w-auto md:min-w-xs"
    >
      <Toast v-for="(item, index) in notification.state.messages" :key="index" v-bind="item" />
    </div>
  </Teleport>
</template>
