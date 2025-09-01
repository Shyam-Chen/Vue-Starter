<script lang="ts" setup>
import { computed, nextTick, reactive, ref } from 'vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';
import Fade from '../fade/Fade.vue';

defineProps<{
  options?: string[];
}>();

const emit = defineEmits<(evt: 'select', val: string) => void>();

const target = ref<HTMLDivElement>();
const dropdown = ref<HTMLDivElement>();

const flux = reactive({
  status: false,
  timeout: undefined as ReturnType<typeof setTimeout> | undefined,
  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    const rect = target.value?.getBoundingClientRect();

    if (!rect || !dropdown.value) return;

    const center = window.innerHeight / 2;
    const middle = window.innerWidth / 2;

    if (rect.top > center) {
      dropdown.value.style.top = `${rect.top}px`;
      flux.direction = 'up';
    } else {
      dropdown.value.style.top = `${rect.bottom}px`;
      flux.direction = 'down';
    }

    if (rect.right > middle) {
      const dropdownRect = dropdown.value.getBoundingClientRect();
      dropdown.value.style.left = `${rect.left - dropdownRect.width + rect.width}px`;
    } else {
      dropdown.value.style.left = `${rect.left}px`;
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
    }, 250);
  },

  select(option: string) {
    flux.status = false;
    flux.timeout = undefined;

    emit('select', option);
  },
});

useScrollParent(
  computed(() => dropdown.value),
  () => {
    if (flux.status) flux.resizePanel();
  },
);
</script>

<template>
  <div class="relative inline-flex text-left" @mouseleave="flux.onMouseleave">
    <div
      ref="target"
      class="inline-flex w-full justify-center items-center rounded-md"
      @mouseenter="flux.onMouseenter"
    >
      <slot></slot>
    </div>

    <Fade>
      <div
        v-if="flux.status"
        ref="dropdown"
        class="fixed z-101 min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        :class="{
          'Dropdown-Panel-PlacementBottom': flux.direction === 'down',
          'Dropdown-Panel-PlacementTop': flux.direction === 'up',
        }"
        tabindex="-1"
        @mouseenter="flux.onMouseenter"
      >
        <div class="py-1">
          <slot name="options">
            <div class="px-1 py-2 text-sm">
              <template v-for="option in options" :key="option">
                <div v-if="option" class="option" @click.stop="flux.select(option)">
                  {{ option }}
                </div>

                <div v-else class="border dark:border-slate-600 my-2"></div>
              </template>
            </div>
          </slot>
        </div>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.option {
  @apply px-3 py-1 cursor-pointer rounded-md;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}

.Dropdown-Panel-PlacementBottom {
  transform: translateY(0.5rem);
}

.Dropdown-Panel-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}
</style>
