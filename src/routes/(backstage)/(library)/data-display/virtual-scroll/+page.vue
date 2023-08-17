<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { UseVirtualList } from '@vueuse/components';

import Breadcrumbs from '~/components/Breadcrumbs.vue';

import leetcode from './leetcode';

const currentPage = ref(1);
const rowsPerPage = ref(20);
const count = ref(100);

const list = ref<Array<{ title: string }>>([]);

const isInitial = ref(false);
const isLoading = ref(false);

function delay(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadMore(currentPage = 1, rowsPerPage = 20) {
  isLoading.value = true;
  await delay();
  isLoading.value = false;

  if (currentPage === 1 && rowsPerPage === 20) {
    return [...list.value, ...leetcode.page1];
  }

  if (currentPage === 2 && rowsPerPage === 20) {
    return [...list.value, ...leetcode.page2];
  }

  if (currentPage === 3 && rowsPerPage === 20) {
    return [...list.value, ...leetcode.page3];
  }

  if (currentPage === 4 && rowsPerPage === 20) {
    return [...list.value, ...leetcode.page4];
  }

  if (currentPage === 5 && rowsPerPage === 20) {
    return [...list.value, ...leetcode.page5];
  }

  return [];
}

async function onScroll({ target }: Event) {
  const { scrollTop, clientHeight } = target as HTMLElement;

  const end = scrollTop + clientHeight;
  const totalPage = count.value / rowsPerPage.value;

  for (let i = 0; i < totalPage; i++) {
    if (
      43 * (1 + rowsPerPage.value * i - 1) < end &&
      end < 43 * (rowsPerPage.value * (i + 1) - 1)
    ) {
      currentPage.value = i + 1;
    }
  }

  if (end === 43 * currentPage.value * rowsPerPage.value) {
    if (currentPage.value + 1 <= totalPage) {
      if (list.value.length < (currentPage.value + 1) * rowsPerPage.value) {
        list.value = await loadMore(currentPage.value + 1, rowsPerPage.value);
      }
    }
  }
}

onMounted(async () => {
  isInitial.value = true;
  list.value = await loadMore();
  isInitial.value = false;
});
</script>

<template>
  <Breadcrumbs
    :items="[{ text: 'Library' }, { text: 'Data Display' }, { text: 'Virtual Scroll' }]"
  />

  <div class="my-4">
    <div class="text-3xl font-bold">Virtual Scroll</div>
  </div>

  <div class="my-4">
    <div>Current Page: {{ currentPage }}</div>
    <div>Rows Per Page: {{ rowsPerPage }}</div>
    <div>Count: {{ count }}</div>
  </div>

  <div
    v-if="isInitial"
    class="flex flex-col my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg h-60"
  >
    <div class="flex items-center px-4 py-2 font-bold" style="height: 43px">Loading...</div>
  </div>

  <div
    v-else
    class="flex flex-col my-4 bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg"
  >
    <UseVirtualList :list="list" :options="{ itemHeight: 43 }" height="15rem" @scroll="onScroll">
      <template #default="{ data, index }">
        <div
          class="flex items-center px-4 py-2 hover:text-primary-500 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-600"
          style="height: 43px"
        >
          {{ data.title }}
        </div>

        <div
          v-if="isLoading && list.length / (index + 1) === 1"
          class="flex items-center px-4 py-2 font-bold"
          style="height: 43px"
        >
          Loading...
        </div>
      </template>
    </UseVirtualList>
  </div>
</template>
