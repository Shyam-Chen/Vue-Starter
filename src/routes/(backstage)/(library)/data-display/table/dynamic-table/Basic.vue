<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref, reactive, onMounted } from 'vue';
import { XTextField, XSelect, XButton, XTable } from '@x/ui';

import leetcode from './leetcode';

const rows = ref<any[]>([]);

const state = reactive({
  control: {} as ComponentProps<typeof XTable>['control'],
  count: 0,
});

const body = reactive({
  title: '',
  difficulty: '',
});

onMounted(async () => {
  const response = await leetcode();
  rows.value = response.result;
  state.count = response.count;
});

function reset() {
  body.title = '';
  body.difficulty = '';
  search();
}

async function search() {
  const response = await leetcode({ ...body, ...state.control });
  rows.value = response.result;
}
</script>

<template>
  <div>
    <div class="text-3xl font-bold my-4">Basic</div>

    <div class="p-8 bg-white dark:bg-slate-800 rounded-lg space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <XTextField v-model:value="body.title" />

        <XSelect
          v-model:value="body.difficulty"
          :options="[
            { label: 'Easy', value: 'Easy' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Hard', value: 'Hard' },
          ]"
        />

        <div class="flex gap-4">
          <XButton color="secondary" class="flex-1" @click="reset">Reset</XButton>
          <XButton class="flex-1" @click="search">Search</XButton>
        </div>
      </div>

      <XTable
        :columns="[
          { key: 'title', name: 'Title' },
          { key: 'difficulty', name: 'Difficulty' },
        ]"
        :rows="rows"
        :count="state.count"
        @change="
          state.control = $event;
          search();
        "
      />
    </div>
  </div>
</template>
