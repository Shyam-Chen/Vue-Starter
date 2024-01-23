<script lang="ts" setup generic="T = object">
import { computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';

import Button from '../button/Button.vue';

type IteratorItem = Partial<T>;

const props = withDefaults(
  defineProps<{
    value?: IteratorItem[];
    disabled?: boolean;
    maxlength?: string | number;
    inGrid?: boolean | string;
    newItem?: IteratorItem;
  }>(),
  {
    value: () => [{}],
    disabled: false,
    maxlength: undefined,
    inGrid: undefined,
    newItem: () => ({}),
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val?: IteratorItem[]): void;
}>();

const valueModel = computed<IteratorItem[]>({
  get: () => {
    if (!props.value?.length) {
      emit('update:value', [{}]);
      return [{}];
    }

    emit('update:value', props.value);
    return props.value;
  },
  set: (val) => emit('update:value', val),
});

const md = useMediaQuery('(min-width: 768px)');

const hasMaxlength = computed(
  () => typeof props.maxlength === 'string' || typeof props.maxlength === 'number',
);

const hasInGrid = computed(() => (props.inGrid && md.value ? props.inGrid : false));

function onAdd() {
  emit('update:value', [...props.value, props.newItem]);
}

function onDelete(idx: number) {
  const arr = [...props.value];
  arr.splice(idx, 1);
  emit('update:value', arr);
}
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div
      v-for="(item, index) in valueModel"
      :key="index"
      class="flex gap-2"
      :class="{ relative: hasInGrid }"
    >
      <div class="w-full flex items-baseline gap-2">
        <slot :item="item" :index="index"></slot>
      </div>

      <div :class="{ 'absolute left-full ml-2': hasInGrid }">
        <Button
          v-if="index === 0"
          icon="i-material-symbols-add-rounded"
          :disabled="disabled || (hasMaxlength && valueModel.length >= Number(maxlength))"
          @click="onAdd"
        />

        <Button
          v-if="index > 0"
          icon="i-material-symbols-check-indeterminate-small-rounded"
          color="danger"
          :disabled="disabled"
          @click="onDelete(index)"
        />
      </div>
    </div>
  </div>
</template>
