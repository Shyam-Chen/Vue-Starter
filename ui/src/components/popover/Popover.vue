<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { inject, nextTick, provide, ref, useTemplateRef, watch, watchEffect } from 'vue';
import scrollableParent from '../../composables/scroll-parent/scrollableParent';
import Fade from '../fade/Fade.vue';

const defaultModel = defineModel<boolean>({ default: undefined });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    start?: boolean;
    end?: boolean;
  }>(),
  {
    disabled: false,
    start: false,
    end: false,
  },
);

const dialog = inject('Dialog', { withinDialog: false });

const target = useTemplateRef<HTMLDivElement>('target');
const panel = useTemplateRef<HTMLDivElement>('panel');

const status = ref(false);
const direction = ref<'down' | 'up' | ''>('');

async function onToggle() {
  if (props.disabled) return;
  if (typeof defaultModel.value === 'boolean') return;

  status.value = !status.value;

  if (status.value) {
    await nextTick();
    onResize();
  }
}

function onClose() {
  if (typeof defaultModel.value === 'boolean') {
    defaultModel.value = false;
  } else {
    status.value = false;
  }
}

function onResize() {
  if (!target.value || !panel.value) return;

  const rect = target.value.getBoundingClientRect();
  const center = window.innerHeight / 2;

  if (rect.top > center) {
    const top = document.documentElement.getBoundingClientRect().top;
    panel.value.style.top = `${Math.abs(top) + rect.top}px`;
    direction.value = 'up';
  } else {
    const top = document.documentElement.getBoundingClientRect().top;
    panel.value.style.top = `${Math.abs(top) + rect.top + rect.height}px`;
    direction.value = 'down';
  }

  const quarter = window.innerWidth / 4;
  const middle = window.innerWidth / 2;

  if (props.start) {
    panel.value.style.left = `${rect.left}px`;
  } else if (props.end) {
    const panelRect = panel.value.getBoundingClientRect();
    panel.value.style.left = `${rect.left - panelRect.width + rect.width}px`;
  } else if (quarter <= rect.right && rect.right <= quarter * 3) {
    const panelRect = panel.value.getBoundingClientRect();
    panel.value.style.left = `${rect.left - panelRect.width / 2 + rect.width / 2}px`;
  } else if (rect.right > middle && rect.width < middle) {
    const panelRect = panel.value.getBoundingClientRect();
    panel.value.style.left = `${rect.left - panelRect.width + rect.width}px`;
  } else {
    panel.value.style.left = `${rect.left}px`;
  }
}

const scrollParent = ref<HTMLElement>();
const scrollGrandparent = ref<HTMLElement>();

function onScroll() {
  onResize();
}

watchEffect((onCleanup) => {
  const el = target.value;

  if (el && (status.value || defaultModel.value)) {
    document.addEventListener('scroll', onScroll);
    scrollParent.value = scrollableParent(el);
    scrollParent.value?.addEventListener('scroll', onScroll);
    scrollGrandparent.value = scrollableParent(scrollParent.value?.parentElement);
    scrollGrandparent.value?.addEventListener('scroll', onScroll);
  }

  onCleanup(() => {
    document.removeEventListener('scroll', onScroll);
    scrollParent.value?.removeEventListener('scroll', onScroll);
    scrollGrandparent.value?.removeEventListener('scroll', onScroll);
  });
});

watch(
  () => defaultModel.value,
  async (val) => {
    if (val) {
      await nextTick();
      onResize();
    }
  },
);

onClickOutside(
  target,
  () => {
    onClose();
  },
  { ignore: ['.Popover-Panel'] },
);

provide('Popover', {
  withinPopover: true,
});
</script>

<template>
  <div class="Popover">
    <div ref="target" class="Popover-Target" @click="onToggle">
      <slot></slot>
    </div>

    <Teleport to="body">
      <Fade>
        <div
          v-if="typeof modelValue === 'boolean' ? defaultModel : status"
          ref="panel"
          tabindex="-1"
          class="Popover-Panel"
          :class="[
            {
              placementBottom: direction === 'down',
              placementTop: direction === 'up',
            },
            dialog.withinDialog ? 'z-111' : 'z-101',
          ]"
        >
          <slot name="content"></slot>
        </div>
      </Fade>
    </Teleport>
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
  @apply absolute min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700;

  &.placementBottom {
    transform: translateY(0.5rem);
  }

  &.placementTop {
    transform: translateY(-0.5rem) translateY(-100%);
  }
}
</style>
