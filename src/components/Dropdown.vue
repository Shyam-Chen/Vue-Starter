<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['select']);

const target = ref();
const dropdown = ref();

const flux = reactive({
  status: false,
  timeout: null as any,
  onMouseenter() {
    flux.status = true;
    clearTimeout(flux.timeout);

    nextTick(() => {
      const rect = target.value.getBoundingClientRect();

      const center = window.innerHeight / 2;
      const middle = window.innerWidth / 2;

      if (rect.top > center) {
        dropdown.value.style.transform = `translateY(-0.5rem) translateY(-${rect.height}px) translateY(-100%)`;
      } else {
        dropdown.value.classList.add('mt-2');
      }

      if (rect.right > middle) {
        dropdown.value.classList.add('right-0');
      } else {
        dropdown.value.classList.add('left-0');
      }
    });
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
      ref="target"
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
        ref="dropdown"
        class="absolute z-10 min-w-max bg-white dark:bg-slate-800 origin-top-right rounded-lg shadow-lg"
        :class="{
          // 'right-0 top-0': true,
        }"
        tabindex="-1"
        @mouseenter="flux.onMouseenter"
      >
        <div class="py-1">
          <slot name="options">
            <template v-for="option in options" :key="option">
              <div
                class="text-sm py-2 px-4 w-full whitespace-nowrap bg-transparent"
                @click.stop="flux.select(option)"
              >
                {{ option }}
              </div>
            </template>
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
