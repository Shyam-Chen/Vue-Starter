<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useOffsetPagination } from '@vueuse/core';

import Button from '../button/Button.vue';

const props = defineProps<{
  value?: number;
  rows?: number;
  count?: number;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val?: number): void;
}>();

const valueModel = computed({
  get: () => props.value || 1,
  set: (val) => emit('update:value', val),
});

const rowsRef = computed(() => props.rows || 10);
const countRef = computed(() => props.count || 0);

const { currentPage, isFirstPage, isLastPage, prev, next } = useOffsetPagination({
  page: valueModel.value,
  pageSize: rowsRef.value,
  total: countRef.value,
});

const pages = computed(() => (countRef.value ? Math.ceil(countRef.value / rowsRef.value) : 0));

const grid3 = computed(() => {
  if (currentPage.value > pages.value - 3) return pages.value - 3;
  if (currentPage.value > 2) return currentPage.value;
  return 3;
});

const grid4 = computed(() => {
  if (currentPage.value >= pages.value - 2) return pages.value - 2;
  if (currentPage.value > 3) return currentPage.value + 1;
  return 4;
});

function onPage(page: number) {
  currentPage.value = page;
}

watch(
  () => currentPage.value,
  (val) => {
    valueModel.value = val;
  },
);
</script>

<template>
  <div v-if="pages > 6" class="flex gap-2">
    <div>
      <Button variant="text" icon="i-mdi-chevron-left" :disabled="isFirstPage" @click="prev" />
    </div>

    <Button :variant="currentPage === 1 ? 'contained' : 'text'" @click="onPage(1)">
      {{ 1 }}
    </Button>

    <template v-if="currentPage">
      <div v-if="currentPage > 3" class="w-38px text-center">...</div>

      <Button v-else :variant="currentPage === 2 ? 'contained' : 'text'" @click="onPage(2)">
        {{ 2 }}
      </Button>
    </template>

    <Button :variant="currentPage === grid3 ? 'contained' : 'text'" @click="onPage(grid3)">
      {{ grid3 }}
    </Button>

    <Button :variant="currentPage === grid4 ? 'contained' : 'text'" @click="onPage(grid4)">
      {{ grid4 }}
    </Button>

    <template v-if="currentPage">
      <div v-if="currentPage < pages - 3" class="w-38px text-center">...</div>

      <Button
        v-else
        :variant="currentPage === pages - 1 ? 'contained' : 'text'"
        @click="onPage(pages - 1)"
      >
        {{ pages - 1 }}
      </Button>
    </template>

    <Button :variant="currentPage === pages ? 'contained' : 'text'" @click="onPage(pages)">
      {{ pages }}
    </Button>

    <div>
      <Button variant="text" icon="i-mdi-chevron-right" :disabled="isLastPage" @click="next" />
    </div>
  </div>

  <div v-else class="flex gap-2">
    <div>
      <Button variant="text" icon="i-mdi-chevron-left" :disabled="isFirstPage" @click="prev" />
    </div>

    <Button
      v-for="page in pages"
      :key="page"
      :variant="currentPage === page ? 'contained' : 'text'"
      @click="onPage(page)"
    >
      {{ page }}
    </Button>

    <div>
      <Button variant="text" icon="i-mdi-chevron-right" :disabled="isLastPage" @click="next" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.Button) {
  @apply rounded-full p-2 min-w-38px;
}
</style>
