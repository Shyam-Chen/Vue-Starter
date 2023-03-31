<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

defineProps<{
  options?: string[];
}>();

const emit = defineEmits<{
  (evt: 'select', val: string): void;
}>();

const target = ref();
const dropdown = ref();

const flux = reactive({
  status: false,
  onMouseenter() {
    flux.status = !flux.status;

    if (!flux.status) return;

    nextTick(() => {
      const rect = target.value.getBoundingClientRect();

      const center = window.innerHeight / 2;
      const middle = window.innerWidth / 2;

      if (rect.top > center) {
        dropdown.value.style.bottom = 'calc(100% + 0.5rem)';
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
    flux.status = false;
  },

  select(option: string) {
    flux.status = false;

    emit('select', option);
  },
});
</script>

<template>
  <div v-on-click-outside="flux.onMouseleave" class="relative inline-block text-left">
    <div
      ref="target"
      class="inline-flex w-full justify-center items-center rounded-md"
      @click="flux.onMouseenter"
    >
      <slot></slot>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-if="flux.status"
        ref="dropdown"
        class="absolute z-10 min-w-max bg-white dark:bg-slate-800 rounded-lg shadow-lg"
        tabindex="-1"
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
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.option {
  @apply px-3 py-1 cursor-pointer rounded-md;
  @apply hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600;
}
</style>
