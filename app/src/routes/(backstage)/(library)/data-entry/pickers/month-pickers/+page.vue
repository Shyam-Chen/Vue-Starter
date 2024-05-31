<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XMonthPicker, XMonthRangePicker, XSwitch } from '@x/ui';
import { subMonths, addMonths, format } from 'date-fns';

const month = ref('');

const month2 = ref('');
const month2MinMonth = ref(true);
const month2MaxMonth = ref(true);

const startMonth = ref('');
const endMonth = ref('');

const startMonth2 = ref('');
const endMonth2 = ref('');
const minMonth = ref(true);
const maxMonth = ref(true);
</script>

<template>
  <XBreadcrumb
    :items="[
      { text: 'Library' },
      { text: 'Data Entry' },
      { text: 'Pickers' },
      { text: 'MonthPicker' },
    ]"
  />

  <h1 class="text-4xl font-extrabold my-4">MonthPicker</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XMonthPicker v-model:value="month" />
      <div class="mt-1">{{ month }}</div>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Min/Max Month</h3>

      <XCard>
        <XMonthPicker
          v-model:value="month2"
          :minMonth="month2MinMonth ? subMonths(new Date(), 2) : undefined"
          :maxMonth="month2MaxMonth ? addMonths(new Date(), 2) : undefined"
          clearable
        />

        <div class="mt-1 space-y-1">
          <XSwitch v-model:value="month2MinMonth">
            Min Month: {{ format(subMonths(new Date(), 2), 'yyyy-MM') }}
          </XSwitch>
          <XSwitch v-model:value="month2MaxMonth">
            Max Month: {{ format(addMonths(new Date(), 2), 'yyyy-MM') }}
          </XSwitch>
        </div>
      </XCard>
    </section>
  </section>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4 pt-6">Range</h2>

    <XCard>
      <XMonthRangePicker v-model:startValue="startMonth" v-model:endValue="endMonth" />

      <div class="mt-1">
        <div>Start Month: {{ startMonth }}</div>
        <div>End Month: {{ endMonth }}</div>
      </div>
    </XCard>

    <section class="my-4">
      <h3 class="text-2xl font-semibold my-4 pt-2">Min/Max Month</h3>

      <XCard>
        <XMonthRangePicker
          v-model:startValue="startMonth2"
          v-model:endValue="endMonth2"
          :minMonth="minMonth ? subMonths(new Date(), 2) : undefined"
          :maxMonth="maxMonth ? addMonths(new Date(), 2) : undefined"
          clearable
        />

        <div class="mt-1 space-y-1">
          <XSwitch v-model:value="minMonth">
            Min Month: {{ format(subMonths(new Date(), 2), 'yyyy-MM') }}
          </XSwitch>
          <XSwitch v-model:value="maxMonth">
            Max Month: {{ format(addMonths(new Date(), 2), 'yyyy-MM') }}
          </XSwitch>
        </div>
      </XCard>
    </section>
  </section>
</template>
