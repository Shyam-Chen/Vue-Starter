<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    default: undefined,
  },
  type: {
    type: String,
    default: 'text',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);

const textFieldValue = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="text-field w-full">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      <slot></slot>
    </label>

    <input
      v-model="textFieldValue"
      v-bind="$attrs"
      :type="type"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'border-red-500 mb-2': errorMessage }"
    />

    <p v-if="errorMessage" class="text-red-500 text-xs italic">{{ errorMessage }}</p>
  </div>
</template>
