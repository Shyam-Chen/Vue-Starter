<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  value?: boolean;
  checked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: boolean): void;
}>();

const uid = uniqueId('switch-');

const switchValue = computed({
  get: () => props.value || false,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="flex items-center">
    <label
      :for="uid"
      class="flex items-center"
      :class="[disabled ? 'cursor-not-allowed opacity-60' : readonly ? '' : 'cursor-pointer']"
    >
      <div class="relative">
        <input
          :id="uid"
          v-model="switchValue"
          v-bind="$attrs"
          type="checkbox"
          :disabled="disabled"
          class="sr-only"
        />

        <div
          class="block w-14 h-8 rounded-full"
          :class="{
            'bg-gray-400': !switchValue || !checked,
            'bg-primary-500': switchValue || checked,
          }"
        ></div>

        <div
          class="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition"
          :class="{
            'translate-x-full': switchValue || checked,
          }"
        ></div>
      </div>

      <div class="ml-2 font-medium empty:hidden">
        <slot></slot>
      </div>
    </label>
  </div>
</template>
