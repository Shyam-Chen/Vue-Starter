<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { XDialog, XButton } from '@x/ui';
import { useIdle } from '@vueuse/core';

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
  <XDialog v-model="flux.idleDialog" class="!w-100">
    <div class="text-2xl">Idle Time-out</div>
    <div class="my-2">Please sign-in again.</div>

    <div class="flex justify-end">
      <XButton @click="flux.idleDialog = false">Okay, got it</XButton>
    </div>
  </XDialog>
</template>
