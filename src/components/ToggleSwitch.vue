<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value']);

const uid = uniqueId('toggle-switch-');

const toggleSwitchValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="flex items-center">
    <label :for="uid" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          :id="uid"
          v-model="toggleSwitchValue"
          v-bind="$attrs"
          type="checkbox"
          class="sr-only"
        />

        <div
          class="block w-14 h-8 rounded-full"
          :class="{
            'bg-gray-400': !toggleSwitchValue,
            'bg-blue-600': toggleSwitchValue,
            'opacity-60 cursor-not-allowed': $attrs.hasOwnProperty('disabled'),
          }"
        ></div>

        <div
          class="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition"
          :class="{
            'translate-x-full': toggleSwitchValue,
            'opacity-60 cursor-not-allowed': $attrs.hasOwnProperty('disabled'),
          }"
        ></div>
      </div>

      <div
        class="toggle-switch-label ml-2 text-gray-700 font-medium"
        :class="{ 'cursor-not-allowed': $attrs.hasOwnProperty('disabled') }"
      >
        <slot></slot>
      </div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.toggle-switch-label:empty {
  display: none;
}
</style>
