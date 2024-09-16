<script lang="ts" setup>
import { nextTick, ref, computed, reactive } from 'vue';

import Fade from '../fade/Fade.vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';
import scrollableParent from '../../composables/scroll-parent/scrollableParent';

const props = withDefaults(
  defineProps<{
    title?: string;
    delay?: number | string;
  }>(),
  {
    title: '',
    delay: 0,
  },
);

const target = ref<HTMLDivElement>();
const panel = ref<HTMLDivElement>();

const flux = reactive({
  status: false,
  enterTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
  leaveTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
  resizePanel() {
    if (target.value && panel.value) {
      const rect = target.value.getBoundingClientRect();
      const center = window.innerHeight / 2;

      const xAxis = `calc(${rect.width / 2}px - 50%)`;
      panel.value.style.left = `${rect.x}px`;

      if (rect.top > center) {
        const top = scrollableParent(target.value)?.getBoundingClientRect().top || 0;
        const yAxis = `calc( ${Math.abs(top) + rect.top}px - 0.25rem - 100%)`;
        panel.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      } else {
        const top = scrollableParent(target.value)?.getBoundingClientRect().top || 0;
        const yAxis = `calc(${Math.abs(top) + rect.bottom}px + 0.25rem)`;
        panel.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      }
    }
  },
  onMouseenter() {
    clearTimeout(flux.leaveTimeout);

    flux.enterTimeout = setTimeout(() => {
      flux.status = true;

      nextTick(() => {
        flux.resizePanel();
      });
    }, Number(props.delay));
  },
  onMouseleave() {
    clearTimeout(flux.enterTimeout);

    flux.leaveTimeout = setTimeout(() => {
      flux.status = false;
    }, 0);
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

    <Teleport to="body">
      <Fade>
        <div v-if="flux.status" ref="panel" tabindex="-1" class="Tooltip-Panel">
          <slot name="content">
            <div class="px-3 py-1 text-sm normal-case text-pretty">
              {{ title }}
            </div>
          </slot>
        </div>
      </Fade>
    </Teleport>
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
  @apply absolute left-0 top-0 z-102 text-slate-100 bg-slate-500 rounded-lg shadow-lg;
}
</style>
