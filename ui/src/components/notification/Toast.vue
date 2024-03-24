<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import Alert from '../alert/Alert.vue';

defineProps<{
  message: string;
  color?: InstanceType<typeof Alert>['color'];
  icon?: InstanceType<typeof Alert>['icon'];
}>();

const severityIcon = new Map();
severityIcon.set('success', 'i-material-symbols-check-circle-rounded');
severityIcon.set('danger', 'i-material-symbols-dangerous-rounded');
severityIcon.set('warning', 'i-material-symbols-warning-rounded');
severityIcon.set('info', 'i-material-symbols-info-rounded');

const status = ref(true);

let timer: ReturnType<typeof setTimeout> | null = null;
const startTime = ref<number>(0);
const remainingTime = ref(3000);

onMounted(() => {
  startTime.value = Date.now();

  timer = setTimeout(() => {
    status.value = false;
  }, remainingTime.value);
});

function onMouseEnter() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    remainingTime.value -= Date.now() - startTime.value;
  }
}

function onMouseLeave() {
  if (timer) return;

  startTime.value = Date.now();

  timer = setTimeout(() => {
    status.value = false;
  }, remainingTime.value);
}

function onClose() {
  status.value = false;
}
</script>

<template>
  <Transition appear name="slide">
    <Alert
      v-if="status"
      v-bind="$attrs"
      :color="color"
      :icon="icon || severityIcon.get(color)"
      class="shadow-xl dark:shadow-primary-500/50"
      :class="{
        '!dark:shadow-secondary-500/50': color === 'secondary',
        '!dark:shadow-success-500/50': color === 'success',
        '!dark:shadow-danger-500/50': color === 'danger',
        '!dark:shadow-warning-500/50': color === 'warning',
        '!dark:shadow-info-500/50': color === 'info',
      }"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @close="onClose"
    >
      {{ message }}
    </Alert>
  </Transition>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
</style>
