<script lang="ts" setup>
import { computed, reactive } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    default: undefined,
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  prepend: {
    type: String,
    default: '',
  },
  append: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value', 'prepend', 'append']);

const textFieldValue = computed({
  get: () => props.value,
  set: (val) => emit('update:value', val),
});

const flux = reactive({
  focused: false,
});
</script>

<template>
  <div class="text-field w-full">
    <label class="block text-sm font-bold mb-2">
      <slot></slot>
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="flex w-full items-center">
      <div
        v-if="prepend"
        class="p-2 border border-slate-400 border-r-0 rounded rounded-r-none bg-white dark:bg-slate-800"
        :class="{
          'important:border-blue-600': flux.focused,
          'important:border-red-500 mb-1': errorMessage,
        }"
        @click.stop="emit('prepend')"
      >
        <div :class="prepend" class="w-5 h-5"></div>
      </div>

      <input
        v-model="textFieldValue"
        v-bind="$attrs"
        :type="type"
        class="border border-slate-400 rounded w-full py-2 px-3 bg-white dark:bg-slate-800 leading-tight focus:border-blue-600 focus:outline-0"
        :class="{
          'important:border-red-500 mb-1': errorMessage,
          'rounded-l-none border-l-0': prepend,
          'rounded-r-none border-r-0': append,
        }"
        @focus="flux.focused = true"
        @blur="flux.focused = false"
      />

      <div
        v-if="append"
        class="p-2 border border-slate-400 border-l-0 rounded rounded-l-none bg-white dark:bg-slate-800"
        :class="{
          'important:border-blue-600': flux.focused,
          'important:border-red-500 mb-1': errorMessage,
        }"
        @click.stop="emit('append')"
      >
        <div :class="append" class="w-5 h-5"></div>
      </div>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.text-field {
  & label:empty {
    display: none;
  }
}
</style>
