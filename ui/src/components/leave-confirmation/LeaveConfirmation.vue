<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';

import Dialog from '../dialog/Dialog.vue';
import Button from '../button/Button.vue';

const props = defineProps<{
  trigger?: boolean;
}>();

const router = useRouter();

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
  <Dialog v-model="status" title="Leave site?" class="!w-100">
    <div>Changes you made may not be saved.</div>

    <div class="flex justify-center gap-2 mt-8">
      <Button color="secondary" @click="status = false">
        <div class="i-mdi-undo w-5 h-5"></div>
        Cancel
      </Button>

      <Button color="success" @click="confirm">
        <div class="i-mdi-hand-okay w-5 h-5"></div>
        Leave
      </Button>
    </div>
  </Dialog>
</template>
