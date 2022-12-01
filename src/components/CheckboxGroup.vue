<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps({
  value: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const emit = defineEmits(['update:value', 'change']);

const uid = uniqueId('checkbox-group-');

const checkboxGroupValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <div v-for="(item, idx) in options" :key="idx" class="flex items-center">
      <input
        :id="`${uid}-${idx}`"
        v-model="checkboxGroupValue"
        v-bind="$attrs"
        type="checkbox"
        :name="uid"
        :value="typeof item === 'object' ? item.value : item"
        class="accent-blue-600 border-gray-300 rounded h-4 w-4 cursor-pointer"
        @change="emit('change', checkboxGroupValue)"
      />

      <label :for="`${uid}-${idx}`" class="ml-2 cursor-pointer">
        {{ typeof item === 'object' ? item.label : item }}
      </label>
    </div>
  </div>
</template>
