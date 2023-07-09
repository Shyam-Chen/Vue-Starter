<script lang="ts" setup>
import { computed, reactive } from 'vue';

import Button from './Button.vue';

type IteratorItem = any;

const props = withDefaults(
  defineProps<{
    value?: IteratorItem[];
    disabled?: boolean;
  }>(),
  {
    value: () => [{}],
  },
);

const emit = defineEmits<{
  (evt: 'update:value', val?: IteratorItem[]): void;
}>();

const listValue = computed<IteratorItem[]>({
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
  <div class="w-full flex flex-col">
    <div
      v-for="(item, index) in listValue"
      :key="index"
      class="flex items-baseline space-x-2 space-y-2"
    >
      <slot :item="item" :index="index" />

      <div>
        <Button
          v-if="index === 0"
          floating
          class="ml-2"
          icon="i-fa-plus"
          :disabled="disabled"
          @click="flux.add"
        />

        <Button
          v-if="index > 0"
          color="danger"
          floating
          class="ml-2"
          icon="i-fa-minus"
          :disabled="disabled"
          @click="flux.remove(index)"
        />
      </div>
    </div>
  </div>
</template>
