<script lang="ts" setup>
import { ref, computed, watch, toRef } from 'vue';
import Draggable from 'vuedraggable';
import remove from 'lodash/remove';

import Checkbox from './Checkbox.vue';
import Button from './Button.vue';

type Item = {
  id?: string | number;
  name?: string;
  checked?: boolean;
};

const props = withDefaults(
  defineProps<{
    source?: Item[];
    target?: Item[];
  }>(),
  {
    source: () => [],
    target: () => [],
  },
);

const emit = defineEmits<{
  (evt: 'update:source', val?: Item[]): void;
  (evt: 'update:target', val?: Item[]): void;
}>();

const sourceList = ref(false);
const sourceListIndeterminate = ref(false);
const list1 = toRef(props, 'source');
const checkedSourceList = computed(() => list1.value.filter((item) => item.checked).length);

const targetList = ref(false);
const targetListIndeterminate = ref(false);
const list2 = toRef(props, 'target');
const checkedTargetList = computed(() => list2.value.filter((item) => item.checked).length);

function changeList() {
  const arr1 = [...list1.value].map((item) => ({ ...item, checked: false }));
  const arr2 = [...list2.value].map((item) => ({ ...item, checked: false }));
  emit('update:source', arr1);
  emit('update:target', arr2);
}

watch(
  () => sourceList.value,
  (checked) => {
    const arr = [...list1.value].map((item) => ({ ...item, checked }));
    emit('update:source', arr);
  },
);

watch(
  () => list1.value,
  (val) => {
    const checked = val.every((item) => item.checked);
    const unchecked = val.every((item) => !item.checked);

    sourceListIndeterminate.value = !(checked || unchecked);

    if (checked) sourceList.value = true;
    if (unchecked) sourceList.value = false;
  },
  { deep: true },
);

watch(
  () => targetList.value,
  (checked) => {
    const arr = [...list2.value].map((item) => ({ ...item, checked }));
    emit('update:target', arr);
  },
);

watch(
  () => list2.value,
  (val) => {
    const checked = val.every((item) => item.checked);
    const unchecked = val.every((item) => !item.checked);

    targetListIndeterminate.value = !(checked || unchecked);

    if (checked) targetList.value = true;
    if (unchecked) targetList.value = false;
  },
  { deep: true },
);

function toRight() {
  const arr = remove(list1.value, (item) => item.checked);
  const arr2 = [...list2.value, ...arr].map((item) => ({ ...item, checked: false }));
  emit('update:target', arr2);
}

function toLeft() {
  const arr = remove(list2.value, (item) => item.checked);
  const arr1 = [...list1.value, ...arr].map((item) => ({ ...item, checked: false }));
  emit('update:source', arr1);
}
</script>

<template>
  <div class="transfer">
    <div class="container">
      <div class="title">
        <Checkbox v-model:value="sourceList" :indeterminate="sourceListIndeterminate">
          Source List
        </Checkbox>

        <span class="text-sm text-slate-400">{{ checkedSourceList }}/{{ list1.length }}</span>
      </div>

      <Draggable
        :list="list1"
        group="list"
        itemKey="name"
        class="list"
        style="height: calc(100% - 54px)"
        @change="changeList"
      >
        <template #item="{ element }">
          <div class="item">
            <Checkbox v-model:value="element.checked">{{ element.name }} </Checkbox>
          </div>
        </template>
      </Draggable>
    </div>

    <div class="controller">
      <Button icon="i-mdi-chevron-right" @click="toRight" />
      <Button icon="i-mdi-chevron-left" @click="toLeft" />
    </div>

    <div class="container">
      <div class="title">
        <Checkbox v-model:value="targetList" :indeterminate="targetListIndeterminate">
          Target List
        </Checkbox>

        <span class="text-sm text-slate-400">{{ checkedTargetList }}/{{ list2.length }}</span>
      </div>

      <Draggable
        :list="list2"
        group="list"
        itemKey="name"
        class="list"
        style="height: calc(100% - 54px)"
        @change="changeList"
      >
        <template #item="{ element }">
          <div class="item">
            <Checkbox v-model:value="element.checked">{{ element.name }}</Checkbox>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transfer {
  @apply flex h-75 gap-3;
}

.container {
  @apply border rounded-md min-w-50 overflow-auto;
}

.title {
  @apply sticky top-0 z-1 px-3 py-2 rounded-t-md flex justify-between items-center gap-2;
  @apply bg-blueGray-200 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200;
}

.list {
  @apply flex flex-col gap-1 bg-slate-900;
}

.item {
  @apply bg-slate-800 px-3 py-1;
}

.controller {
  @apply self-center space-y-2;
}
</style>
