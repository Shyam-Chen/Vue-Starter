<script lang="ts" setup>
import { ref } from 'vue';
import Draggable from 'vuedraggable';

import Checkbox from './Checkbox.vue';
import Button from './Button.vue';

defineProps<{
  value?: any[];
  data?: any[];
}>();

const list1 = ref([
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 },
  { name: 'Angular', id: 8 },
  { name: 'React', id: 9 },
  { name: 'Svelte', id: 10 },
  { name: 'Vue', id: 11 },
  { name: 'TypeScript', id: 12 },
  { name: 'JavaScript', id: 13 },
  { name: 'CoffeeScript', id: 14 },
  { name: 'PureScript', id: 15 },
]);

const list2 = ref([
  { name: 'Juan', id: 5 },
  { name: 'Edgard', id: 6 },
  { name: 'Johnson', id: 7 },
]);
</script>

<template>
  <div class="transfer">
    <div class="container">
      <div class="title">
        <Checkbox>Source List</Checkbox>
        <span class="text-sm text-slate-400">0/12</span>
      </div>

      <Draggable :list="list1" itemKey="name" class="list">
        <template #item="{ element, index }">
          <div>
            <Checkbox v-model:value="element.checked">{{ element.name }} {{ index }}</Checkbox>
          </div>
        </template>
      </Draggable>
    </div>

    <div class="controller">
      <Button icon="i-mdi-chevron-left" />
      <Button icon="i-mdi-chevron-right" />
    </div>

    <div class="container">
      <div class="title">
        <Checkbox>Target List</Checkbox>
        <span class="text-sm text-slate-400">0/3</span>
      </div>

      <Draggable :list="list2" itemKey="name" class="list">
        <template #item="{ element, index }">
          <Checkbox v-model:value="element.checked">{{ element.name }} {{ index }}</Checkbox>
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
  @apply flex flex-col gap-2 px-3 py-2;
}

.controller {
  @apply self-center space-y-2;
}
</style>
