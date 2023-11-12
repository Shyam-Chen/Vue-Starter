<script lang="ts" setup>
import { ref, computed, reactive, nextTick } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps<{
  modelValue?: boolean;
  options?: string[];
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
}>();

const status = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const target = ref();
const dropdown = ref();

const flux = reactive({
  status: false,
  onMouseenter() {
    flux.status = !flux.status;
    status.value = !status.value;

    if (!flux.status && !status.value) return;

    nextTick(() => {
      const rect = target.value.getBoundingClientRect();

      const center = window.innerHeight / 2;

      dropdown.value.style.left = `${rect.x}px`;
      dropdown.value.style.top = `${rect.y}px`;

      const xAxis = `calc(${rect.width / 2}px - 50%)`;

      if (rect.top > center) {
        const yAxis = `calc(-100% - 0.25rem)`;
        dropdown.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      } else {
        const yAxis = `calc(${rect.height}px + 0.25rem)`;
        dropdown.value.style.transform = `translate(${xAxis}, ${yAxis})`;
      }
    });
  },
  onMouseleave() {
    flux.status = false;
    status.value = false;
  },
});
</script>

<template>
  <div v-on-click-outside="flux.onMouseleave" class="relative inline-flex">
    <div
      ref="target"
      class="inline-flex w-full justify-center items-center rounded-md"
      @click="flux.onMouseenter"
    >
      <slot></slot>
    </div>

    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="flux.status || status"
        ref="dropdown"
        class="fixed z-10 top-0 left-0 min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg"
        tabindex="-1"
      >
        <div class="py-1">
          <slot name="content"> </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.option {
  @apply px-3 py-1 cursor-pointer rounded-md;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}
</style>
