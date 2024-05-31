<script lang="ts" setup>
import { XCard, XTable } from '@x/ui';
import { staticTable } from '@x/ui';
import { ref } from 'vue';

const rows = ref([]);
const control = ref({ rows: 10, page: 1, field: 'id', direction: 'asc' });
</script>

<template>
  <section>
    <h2 class="text-3xl font-bold my-4">No Data</h2>

    <XCard>
      <XTable
        v-model:control="control"
        :static="staticTable"
        :columns="[
          { key: 'title', name: 'Title' },
          { key: 'difficulty', name: 'Difficulty' },
        ]"
        :rows="rows"
        :count="rows?.length"
      />
    </XCard>
  </section>
</template>
