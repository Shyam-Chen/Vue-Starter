<script lang="ts" setup>
import { ref, computed, watch, toRef } from 'vue';
import Draggable from 'vuedraggable';
import remove from 'lodash/remove';

import Checkbox from '../checkbox/Checkbox.vue';
import Button from '../button/Button.vue';

type Item = {
  id?: string | number;
  name?: string;
  checked?: boolean;
};

const props = defineProps<{
  source?: Item[];
  target?: Item[];
}>();

const emit = defineEmits<{
  (evt: 'update:source', val?: Item[]): void;
  (evt: 'update:target', val?: Item[]): void;
}>();

const sourceRef = toRef(props, 'source', []);
const sourceSelectAll = ref(false);
const sourceIndeterminate = ref(false);
const sourceChecked = computed(() => sourceRef.value.filter((item) => item.checked).length);

const targetRef = toRef(props, 'target', []);
const targetSelectAll = ref(false);
const targetIndeterminate = ref(false);
const targetChecked = computed(() => targetRef.value.filter((item) => item.checked).length);

function changeList() {
  const source = [...sourceRef.value].map((item) => ({ ...item, checked: false }));
  const target = [...targetRef.value].map((item) => ({ ...item, checked: false }));
  emit('update:source', source);
  emit('update:target', target);
}

function toRight() {
  const source = remove(sourceRef.value, (item) => item.checked);
  const target = [...targetRef.value, ...source].map((item) => ({ ...item, checked: false }));
  emit('update:target', target);
}

function toLeft() {
  const target = remove(targetRef.value, (item) => item.checked);
  const source = [...sourceRef.value, ...target].map((item) => ({ ...item, checked: false }));
  emit('update:source', source);
}

watch(
  () => sourceSelectAll.value,
  (checked) => {
    const source = [...sourceRef.value].map((item) => ({ ...item, checked }));
    emit('update:source', source);
  },
);

watch(
  () => sourceRef.value,
  (val) => {
    const checked = val.every((item) => item.checked);
    const unchecked = val.every((item) => !item.checked);

    sourceIndeterminate.value = !(checked || unchecked);

    if (checked) sourceSelectAll.value = true;
    if (unchecked) sourceSelectAll.value = false;
  },
  { deep: true },
);

watch(
  () => targetSelectAll.value,
  (checked) => {
    const target = [...targetRef.value].map((item) => ({ ...item, checked }));
    emit('update:target', target);
  },
);

watch(
  () => targetRef.value,
  (val) => {
    const checked = val.every((item) => item.checked);
    const unchecked = val.every((item) => !item.checked);

    targetIndeterminate.value = !(checked || unchecked);

    if (checked) targetSelectAll.value = true;
    if (unchecked) targetSelectAll.value = false;
  },
  { deep: true },
);
</script>

<template>
  <div class="transfer">
    <div class="container">
      <div class="title">
        <Checkbox v-model:value="sourceSelectAll" :indeterminate="sourceIndeterminate">
          Source List
        </Checkbox>

        <span class="text-sm text-slate-400">{{ sourceChecked }}/{{ sourceRef.length }}</span>
      </div>

      <Draggable
        :list="sourceRef"
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
      <Button
        :color="sourceChecked ? 'primary' : 'secondary'"
        icon="i-mdi-chevron-right"
        :disabled="!sourceChecked"
        @click="toRight"
      />
      <Button
        :color="targetChecked ? 'primary' : 'secondary'"
        icon="i-mdi-chevron-left"
        :disabled="!targetChecked"
        @click="toLeft"
      />
    </div>

    <div class="container">
      <div class="title">
        <Checkbox v-model:value="targetSelectAll" :indeterminate="targetIndeterminate">
          Target List
        </Checkbox>

        <span class="text-sm text-slate-400">{{ targetChecked }}/{{ targetRef.length }}</span>
      </div>

      <Draggable
        :list="targetRef"
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
