<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

import scrollableParent from '../../utilities/scrollable-parent/scrollableParent';

import Fade from '../fade/Fade.vue';

const props = defineProps<{
  modelValue?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const target = ref();
const panel = ref();

const flux = reactive({
  status: false,
  toggle() {
    if (props.disabled) return;

    flux.status = !flux.status;
    model.value = !model.value;

    if (!flux.status && !model.value) return;

    nextTick(() => {
      flux.scrollableParent = scrollableParent(panel.value);
      flux.resizePanel();
    });
  },
  close() {
    flux.status = false;
    model.value = false;
  },

  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    const rect = target.value.getBoundingClientRect();

    const center = window.innerHeight / 2;
    const middle = window.innerWidth / 2;

    if (!panel.value) return;

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
  scrollableParent: null as HTMLElement | null,
  handleScroll() {
    if (flux.status) {
      flux.resizePanel();
    }
  },
});

watch(
  () => flux.scrollableParent,
  (el) => {
    el?.addEventListener('scroll', flux.handleScroll);
  },
);

onMounted(() => {
  if (flux.scrollableParent && flux.scrollableParent instanceof HTMLElement) {
    flux.scrollableParent?.addEventListener('scroll', flux.handleScroll);
  } else {
    window.addEventListener('scroll', flux.handleScroll);
  }
});

onUnmounted(() => {
  if (flux.scrollableParent && flux.scrollableParent instanceof HTMLElement) {
    flux.scrollableParent?.removeEventListener('scroll', flux.handleScroll);
  } else {
    window.removeEventListener('scroll', flux.handleScroll);
  }
});
</script>

<template>
  <div v-on-click-outside="flux.close" class="relative inline-flex">
    <div
      ref="target"
      class="inline-flex w-full justify-center items-center rounded-md"
      @click="flux.toggle"
    >
      <slot></slot>
    </div>

    <Fade>
      <div
        v-if="flux.status || model"
        ref="panel"
        tabindex="-1"
        class="fixed z-100 top-0 left-0 min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg"
        :class="{
          'Dropdown-Panel-PlacementBottom': flux.direction === 'down',
          'Dropdown-Panel-PlacementTop': flux.direction === 'up',
        }"
      >
        <div class="py-1">
          <slot name="content"> </slot>
        </div>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.Dropdown-Panel-PlacementBottom {
  transform: translateY(0.5rem);
}

.Dropdown-Panel-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}
</style>
