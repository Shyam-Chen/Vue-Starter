<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { reactive } from 'vue';
import { XButton, XCard, XTable } from '@x/ui';

import leetcode from './leetcode';

type TableProps = ComponentProps<typeof XTable>;

const state = reactive({
  loading: false,
  rows: [] as any[],
  control: { rows: 10, page: 1, field: 'id', direction: 'asc' } as TableProps['control'],
  count: 0,
});

const body = reactive({
  title: '',
  difficulty: '',
});

async function search() {
  state.loading = true;
  state.control = { rows: 10, page: 1, field: 'id', direction: 'asc' };
  const response = await leetcode({ ...body, ...state.control });
  state.loading = false;
  state.rows = response.result;
  state.count = response.count;
}

async function change() {
  state.loading = true;
  const response = await leetcode({ ...body, ...state.control });
  state.loading = false;
  state.rows = response.result;
  state.count = response.count;
}
</script>

<template>
  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Loading</h2>

    <XCard>
      <XButton
        prepend="i-material-symbols-search-rounded"
        label="Search"
        :loading="state.loading"
        class="mb-4"
        @click="search"
      />
      <XTable
        v-model:control="state.control"
        :columns="[
          { key: 'title', name: 'Title', class: 'w-2/3' },
          { key: 'difficulty', name: 'Difficulty' },
        ]"
        :loading="state.loading"
        :rows="state.rows"
        :count="state.count"
        @change="change"
      />
    </XCard>
  </section>
</template>
