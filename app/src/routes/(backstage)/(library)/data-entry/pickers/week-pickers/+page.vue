<script lang="ts" setup>
import { XBreadcrumb, XCard, type XWeekPicker } from '@x/ui';
import { format } from 'date-fns';
import { ref } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

const week1 = ref('');

const week2 = ref('');
const week2start = ref<Date>();
const week2end = ref<Date>();

const week2change: ComponentProps<typeof XWeekPicker>['onChange'] = (week, startDate, endDate) => {
  week2start.value = startDate;
  week2end.value = endDate;
};
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'WeekPicker' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">WeekPicker</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XWeekPicker v-model:value="week1" />
      <div class="mt-1">{{ week1 }}</div>
    </XCard>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">onChange</h2>

    <XCard>
      <XWeekPicker v-model:value="week2" @change="week2change" />

      <div v-if="week2start && week2end" class="mt-1">
        <div>Week: {{ week2 }}</div>
        <div>
          Range: {{ format(week2start, 'yyyy/MM/dd') }} ~ {{ format(week2end, 'yyyy/MM/dd') }}
        </div>
      </div>
    </XCard>
  </section>
</template>
