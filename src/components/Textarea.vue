<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  rows: {
    type: String,
    default: '5',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);

const textareaValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="textarea w-full">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      <slot></slot>
    </label>

    <textarea
      v-model="textareaValue"
      v-bind="$attrs"
      :rows="rows"
      class="border border-slate-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'important:border-red-500 mb-1': errorMessage }"
    ></textarea>

    <p v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.textarea {
  & label:empty {
    display: none;
  }
}
</style>
