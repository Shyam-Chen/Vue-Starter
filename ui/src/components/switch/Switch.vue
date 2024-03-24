<script lang="ts" setup>
import { ref, computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  value?: boolean;
  checked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: boolean): void;
  (evt: 'focus', val: Event): void;
  (evt: 'blur', val: Event): void;
}>();

const uid = uniqueId('uid-');

const valueModel = computed({
  get: () => props.value || false,
  set: (val) => !props.readonly && emit('update:value', val),
});

const focused = ref(false);

function onFocus(evt: Event) {
  focused.value = true;
  emit('focus', evt);
}

function onBlur(evt: Event) {
  focused.value = false;
  emit('blur', evt);
}
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
          v-model="valueModel"
          v-bind="$attrs"
          type="checkbox"
          role="switch"
          :disabled="disabled"
          class="sr-only"
          @focus="onFocus"
          @blur="onBlur"
        />

        <div
          class="w-10.5 h-6 rounded-full"
          :class="{
            'bg-gray-300 dark:bg-gray-500': !valueModel || !checked,
            'bg-primary-500 dark:bg-primary-500': valueModel || checked,
            'ring-2 ring-primary-500/40': focused,
          }"
        ></div>

        <div
          class="absolute ms-0.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-white/60 rounded-full transition"
          :class="{ 'translate-x-4.5': valueModel || checked }"
        ></div>
      </div>

      <div class="ml-2 font-medium empty:hidden">
        <slot></slot>
      </div>
    </label>
  </div>
</template>
