<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const emit = defineEmits(['update:value', 'change']);

const uid = uniqueId('radio-group-');

const radioGroupValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <div v-for="(item, idx) in options" :key="idx" class="flex items-center">
      <input
        :id="`${uid}-${idx}`"
        v-model="radioGroupValue"
        v-bind="$attrs"
        type="radio"
        :name="uid"
        :value="typeof item === 'object' ? item.value : item"
        class="accent-blue-600 border-gray-300 rounded h-4 w-4 cursor-pointer"
        :class="[$attrs.hasOwnProperty('disabled') ? 'cursor-not-allowed' : 'cursor-pointer']"
        @change="emit('change', radioGroupValue)"
      />

      <label
        :for="`${uid}-${idx}`"
        class="ml-2 cursor-pointer"
        :class="[$attrs.hasOwnProperty('disabled') ? 'cursor-not-allowed' : 'cursor-pointer']"
      >
        {{ typeof item === 'object' ? item.label : item }}
      </label>
    </div>
  </div>
</template>
