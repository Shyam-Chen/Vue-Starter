<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';

import Fade from '../fade/Fade.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    disabled: false,
  },
);

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const defaultModel = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const target = ref();
const panel = ref();

const flux = reactive({
  status: false,
  toggle() {
    if (props.disabled) return;

    if (typeof props.modelValue === 'boolean') {
      defaultModel.value = !defaultModel.value;
    } else {
      flux.status = !flux.status;

      nextTick(() => {
        flux.resizePanel();
      });
    }
  },
  close() {
    if (typeof props.modelValue === 'boolean') {
      defaultModel.value = false;
    } else {
      flux.status = false;
    }
  },

  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    const rect = target.value.getBoundingClientRect();

    const center = window.innerHeight / 2;
    const middle = window.innerWidth / 2;

    if (rect.top > center) {
      panel.value.style.top = `${rect.top}px`;
      flux.direction = 'up';
    } else {
      panel.value.style.top = `${rect.bottom}px`;
      flux.direction = 'down';
    }

    const quarter = window.innerWidth / 4;

    if (quarter <= rect.right && rect.right <= quarter * 3) {
      const panelRect = panel.value.getBoundingClientRect();
      panel.value.style.left = `${rect.left - panelRect.width / 2 + rect.width / 2}px`;
    } else if (rect.right > middle) {
      const panelRect = panel.value.getBoundingClientRect();
      panel.value.style.left = `${rect.left - panelRect.width + rect.width}px`;
    } else {
      panel.value.style.left = `${rect.left}px`;
    }
  },
});

useScrollParent(
  computed(() => panel.value),
  () => {
    if (flux.status || defaultModel.value) flux.resizePanel();
  },
);

watch(
  () => defaultModel.value,
  (val) => {
    if (val) {
      nextTick(() => {
        flux.resizePanel();
      });
    }
  },
);
</script>

<template>
  <div v-on-click-outside="flux.close" class="Popover">
    <div ref="target" class="Popover-Target" @click="flux.toggle">
      <slot></slot>
    </div>

    <Fade>
      <div
        v-if="typeof modelValue === 'boolean' ? defaultModel : flux.status"
        ref="panel"
        tabindex="-1"
        class="Popover-Panel"
        :class="{
          placementBottom: flux.direction === 'down',
          placementTop: flux.direction === 'up',
        }"
      >
        <slot name="content"></slot>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.Popover {
  @apply relative inline-flex;
}

.Popover-Target {
  @apply w-full inline-flex justify-center items-center;
}

.Popover-Panel {
  @apply fixed z-100 min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700;

  &.placementBottom {
    transform: translateY(0.5rem);
  }

  &.placementTop {
    transform: translateY(-0.5rem) translateY(-100%);
  }
}
</style>
