<script lang="ts" setup>
import { reactive } from 'vue';

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['select']);

const flux = reactive({
  status: false,
  timeout: null as any,
  onMouseenter() {
    flux.status = true;
    clearTimeout(flux.timeout);
  },
  onMouseleave() {
    flux.timeout = setTimeout(() => {
      flux.status = false;
    }, 250);
  },

  select(option: any) {
    flux.status = false;
    flux.timeout = null;

    emit('select', option);
  },
});
</script>

<template>
  <div class="relative inline-block text-left" @mouseleave="flux.onMouseleave">
    <div
      class="inline-flex w-full justify-center items-center rounded-md"
      @mouseenter="flux.onMouseenter"
    >
      <slot></slot>
    </div>

    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-show="flux.status"
        class="absolute right-0 z-10 mt-2 min-w-max bg-white origin-top-right rounded-lg shadow-lg"
        tabindex="-1"
        @mouseenter="flux.onMouseenter"
      >
        <div class="py-1">
          <template v-for="option in options" :key="option">
            <div
              class="text-sm py-2 px-4 w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
              @click.stop="flux.select(option)"
            >
              {{ option }}
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>
