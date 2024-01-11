<script lang="ts" setup generic="T = object">
import { computed, reactive } from 'vue';

import Button from '../button/Button.vue';

type IteratorItem = Partial<T>;

const props = withDefaults(
  defineProps<{
    value?: IteratorItem[];
    disabled?: boolean;
    maxlength?: string | number;
  }>(),
  {
    value: () => [{}],
    disabled: false,
    maxlength: undefined,
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

const hasMaxlength = computed(
  () => typeof props.maxlength === 'string' || typeof props.maxlength === 'number',
);

const flux = reactive({
  add() {
    emit('update:value', [...props.value, {}]);
  },
  remove(idx: number) {
    const arr = [...props.value];
    arr.splice(idx, 1);
    emit('update:value', arr);
  },
});
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div v-for="(item, index) in valueModel" :key="index" class="flex gap-2">
      <div class="w-full flex items-baseline gap-2">
        <slot :item="item" :index="index"></slot>
      </div>

      <div>
        <Button
          v-if="index === 0"
          icon="i-material-symbols-add-rounded"
          :disabled="disabled || (hasMaxlength && valueModel.length >= Number(maxlength))"
          @click="flux.add"
        />

        <Button
          v-if="index > 0"
          icon="i-material-symbols-check-indeterminate-small-rounded"
          color="danger"
          :disabled="disabled"
          @click="flux.remove(index)"
        />
      </div>
    </div>
  </div>
</template>
