<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  value?: string;
  options?: string[] | Array<{ label: string; value: string }>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'change', val: string): void;
}>();

const uid = uniqueId('radio-group-');

const radioGroupValue = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <label
      v-for="(item, idx) in options"
      :key="idx"
      class="flex items-center"
      :class="[disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer']"
    >
      <div class="relative flex justify-center items-center">
        <input
          :id="`${uid}-${idx}`"
          v-model="radioGroupValue"
          v-bind="$attrs"
          type="radio"
          :name="uid"
          :value="typeof item === 'object' ? item.value : item"
          :disabled="disabled"
          class="radio"
          @change="emit('change', radioGroupValue)"
        />

        <div
          class="absolute select-none w-3.5 h-3.5 text-primary-500"
          :class="{
            'i-mdi-circle': radioGroupValue.includes(typeof item === 'object' ? item.value : item),
          }"
        ></div>
      </div>

      <div class="ml-2">
        {{ typeof item === 'object' ? item.label : item }}
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.radio {
  @apply appearance-none w-5 h-5 rounded-full bg-white border border-slate-400 dark:border-slate-600;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-400 focus:shadow-lg;
}
</style>
