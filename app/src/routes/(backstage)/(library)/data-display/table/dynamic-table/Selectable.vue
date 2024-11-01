<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref, onMounted } from 'vue';
import { XTable } from '@x/ui';

import leetcode, { type Problem } from './leetcode';

type TableProps = ComponentProps<typeof XTable>;

const loading = ref(true);
const selected = ref<Problem[]>([]);
const control = ref<TableProps['control']>({});
const rows = ref<Problem[]>([]);
const count = ref(0);

async function initial() {
  const response = await leetcode();
  loading.value = false;
  rows.value = response.result;
  count.value = response.count;
}

async function change(params: TableProps['control']) {
  loading.value = true;
  control.value = params;
  const response = await leetcode(params);
  loading.value = false;
  rows.value = response.result;
}

onMounted(() => {
  initial();
});
</script>

<template>
  <XTable
    v-model:selected="selected"
    v-model:control="control"
    selectable
    :columns="[
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'difficulty', name: 'Difficulty' },
    ]"
    :loading
    :rows
    :count
    @change="change"
  />

  <div class="flex gap-1 mt-1">
    Output:
    <output>{{ selected.map((item) => item.id) }}</output>
  </div>
</template>
