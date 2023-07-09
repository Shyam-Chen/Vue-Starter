<script lang="ts" setup>
import { computed } from 'vue';

import DatePicker from './DatePicker.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  startValue?: string;
  endValue?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:startValue', val?: string): void;
  (evt: 'update:endValue', val?: string): void;
}>();

const startValueModel = computed({
  get: () => props.startValue,
  set: (val) => emit('update:startValue', val),
});

const endValueModel = computed({
  get: () => props.endValue,
  set: (val) => emit('update:endValue', val),
});
</script>

<template>
  <div class="flex justify-center items-baseline w-full">
    <DatePicker v-model:value="startValueModel" v-bind="$attrs" :maxDate="endValueModel" />
    <span class="mx-2">~</span>
    <DatePicker v-model:value="endValueModel" v-bind="$attrs" :minDate="startValueModel" />
  </div>
</template>
