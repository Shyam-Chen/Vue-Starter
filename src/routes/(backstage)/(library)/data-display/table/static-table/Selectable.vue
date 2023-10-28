<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import TextField from '~/components/TextField.vue';
import Select from '~/components/Select.vue';
import Button from '~/components/Button.vue';
import Table from '~/components/table';
import staticTable from '~/utilities/staticTable';

import leetcode from './leetcode';

const title = ref('');
const difficulty = ref('');

const response = ref<typeof leetcode>([]);
const rows = ref<typeof leetcode>([]);
const control = ref({ rows: 10, page: 1, field: 'id', direction: 'asc' });

const selected = ref<typeof leetcode>([]);

onMounted(() => {
  response.value = structuredClone(leetcode);
  rows.value = structuredClone(leetcode);
});

function reset() {
  title.value = '';
  difficulty.value = '';
  search();
}

function search() {
  let data = [...response.value];

  if (title.value) {
    data = data.filter((item) => item.title.toUpperCase().includes(title.value.toUpperCase()));
  }

  if (difficulty.value) {
    data = data.filter((item) =>
      item.difficulty.toUpperCase().includes(difficulty.value.toUpperCase()),
    );
  }

  rows.value = data;
  control.value = { rows: 10, page: 1, field: 'id', direction: 'asc' };
}

function selecteAll(val: boolean, arr: typeof leetcode) {
  arr.forEach((row: any) => {
    const found: any = response.value.find((item) => item.id === row.id);

    if (found) {
      found.checked = val;
    }
  });
}

function getSelected() {
  selected.value = rows.value.filter((item: any) => item.checked);
}
</script>

<template>
  <div>
    <div class="text-3xl font-bold">Selectable</div>

    <div class="flex flex-col gap-8 p-8 my-8 bg-white dark:bg-slate-800 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField v-model:value="title" />

        <Select
          v-model:value="difficulty"
          :options="[
            { label: 'Easy', value: 'Easy' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Hard', value: 'Hard' },
          ]"
        />

        <div class="flex gap-4">
          <Button color="secondary" class="flex-1" @click="reset">Reset</Button>
          <Button class="flex-1" @click="search">Search</Button>
        </div>
      </div>

      <Table
        v-model:control="control"
        selectable
        :static="staticTable"
        :columns="[
          { key: 'title', name: 'Title' },
          { key: 'difficulty', name: 'Difficulty' },
        ]"
        :rows="rows"
        :count="rows?.length"
        @selecteAll="selecteAll"
      />

      <Button @click="getSelected">Get Selected</Button>
      <div>{{ selected?.map((item) => item.id) }}</div>
    </div>
  </div>
</template>
