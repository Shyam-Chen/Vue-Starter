<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

import TextField from '~/components/TextField.vue';
import Select from '~/components/Select.vue';
import Button from '~/components/Button.vue';
import Table from '~/components/table';

import leetcode from './leetcode';

const rows = ref<any[]>([]);

const body = reactive({
  title: '',
  difficulty: '',
});

onMounted(async () => {
  const response = await leetcode();
  rows.value = response.result;
});

function reset() {
  body.title = '';
  body.difficulty = '';
}

async function search() {
  const response = await leetcode();
  rows.value = response.result;
}
</script>

<template>
  <div>
    <div class="text-3xl font-bold">Basic</div>

    <div class="p-8 bg-white dark:bg-slate-800 rounded-lg space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField v-model:value="body.title" />

        <Select
          v-model:value="body.difficulty"
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
        :columns="[
          { key: 'title', name: 'Title' },
          { key: 'difficulty', name: 'Difficulty' },
        ]"
        :rows="rows"
        :count="rows?.length"
      />
    </div>
  </div>
</template>
