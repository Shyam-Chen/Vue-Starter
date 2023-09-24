<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useIdle } from '@vueuse/core';

import Dialog from '~/components/Dialog.vue';
import Button from '~/components/Button.vue';

const router = useRouter();
const { idle } = useIdle(30 * 60 * 1000);

const flux = reactive({
  idleDialog: false,
});

watch(
  () => idle.value,
  (val) => {
    if (val) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      flux.idleDialog = true;
    }
  },
);

watch(
  () => flux.idleDialog,
  (val) => {
    if (!val) router.push('/sign-in');
  },
);
</script>

<template>
  <Dialog v-model="flux.idleDialog">
    <div class="text-2xl">Idle Time-out</div>
    <div class="my-2">Please sign-in again.</div>

    <div class="flex justify-end">
      <Button @click="flux.idleDialog = false">Okay, got it</Button>
    </div>
  </Dialog>
</template>
