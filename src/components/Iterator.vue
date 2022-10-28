<script lang="ts" setup>
import { computed, reactive } from 'vue';

import Button from './Button.vue';

const props = defineProps({
  value: {
    type: Array,
    default: () => [{}],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value']);

const listValue = computed({
  get: () => {
    const val = props.value || [{}];
    emit('update:value', val);
    return val;
  },
  set: (val) => emit('update:value', val),
});

const flux = reactive({
  add() {
    emit('update:value', [...props.value, {}]);
  },
  remove(idx) {
    const arr = [...props.value];
    arr.splice(idx, 1);
    emit('update:value', arr);
  },
});
</script>

<template>
  <div class="flex flex-col">
    <div v-for="(item, index) in listValue" :key="index" class="flex items-baseline space-x-2 space-y-2">
      <slot :item="item" :index="index" />

      <div>
        <Button
          v-if="index === 0"
          color="primary"
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
