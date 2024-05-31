<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLocale } from 'vue-localer';
import type { RouteLocationNormalized } from 'vue-router';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

import Button from '../button/Button.vue';
import Dialog from '../dialog/Dialog.vue';

const props = defineProps<{
  trigger?: boolean;
}>();

const router = useRouter();
const locale = useLocale();

const triggerRef = computed(() => props.trigger);

const status = ref(false);
const cacheTo = ref<RouteLocationNormalized>();
const confirmed = ref(false);

onBeforeRouteLeave((to) => {
  if (triggerRef.value) {
    cacheTo.value = to;
    status.value = true;
    return confirmed.value;
  }

  return true;
});

async function confirm() {
  confirmed.value = true;
  if (cacheTo.value) await router.push(cacheTo.value.fullPath);
  document.body.style.overflow = 'auto';
}

function onBeforeUnload(evt: Event) {
  if (triggerRef.value) {
    evt.preventDefault();
    evt.returnValue = false;
    return false;
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', onBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', onBeforeUnload);
});
</script>

<template>
  <Dialog v-model="status" :title="locale.leaveConfirmationTitle || 'Leave site?'" class="!w-100">
    <div>{{ locale.leaveConfirmationMessage || 'Changes you made may not be saved.' }}</div>

    <div class="flex justify-center gap-2 mt-8">
      <Button :label="locale.cancel || 'Cancel'" color="secondary" @click="status = false" />
      <Button :label="locale.leave || 'Leave'" @click="confirm" />
    </div>
  </Dialog>
</template>
