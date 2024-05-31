<script lang="ts" setup>
import { computed, nextTick, reactive, ref } from 'vue';

import useScrollParent from '../../composables/scroll-parent/useScrollParent';
import Fade from '../fade/Fade.vue';

defineProps<{
  title?: string;
}>();

const target = ref<HTMLDivElement>();
const panel = ref<HTMLDivElement>();

const flux = reactive({
  status: false,
  timeout: undefined as ReturnType<typeof setTimeout> | undefined,
  resizePanel() {
    if (target.value && panel.value) {
      const rect = target.value.getBoundingClientRect();

      const center = window.innerHeight / 2;

      panel.value.style.left = `${rect.x}px`;
      panel.value.style.top = `${rect.y}px`;

      const xAxis = `calc(${rect.width / 2}px - 50%)`;

      if (rect.top > center) {
        const yAxis = `calc(-100% - 0.25rem)`;
        panel.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      } else {
        const yAxis = `calc(${rect.height}px + 0.25rem)`;
        panel.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      }
    }
  },
  onMouseenter() {
    flux.status = true;
    clearTimeout(flux.timeout);

    nextTick(() => {
      flux.resizePanel();
    });
  },
  onMouseleave() {
    flux.timeout = setTimeout(() => {
      flux.status = false;
    }, 50);
  },
});

// Use during touch interaction.
useScrollParent(
  computed(() => panel.value),
  () => {
    if (flux.status) flux.resizePanel();
  },
);
</script>

<template>
  <div class="Tooltip" @mouseleave="flux.onMouseleave">
    <div ref="target" class="Tooltip-Target" @mouseenter="flux.onMouseenter">
      <slot></slot>
    </div>

    <Fade>
      <div v-if="flux.status" ref="panel" class="Tooltip-Panel" tabindex="-1">
        <slot name="content">
          <div class="px-3 py-1 text-sm normal-case text-pretty">
            {{ title }}
          </div>
        </slot>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.Tooltip {
  @apply relative inline-flex;
}

.Tooltip-Target {
  @apply w-full inline-flex justify-center items-center;
}

.Tooltip-Panel {
  @apply fixed left-0 top-0 z-102 text-slate-100 bg-slate-500 rounded-lg shadow-lg;
}
</style>
