<script lang="ts" setup>
import { reactive } from 'vue';
import { XBreadcrumb, XWeekPicker } from '@x/ui';
import { format } from 'date-fns';

const flux = reactive({
  weekPicker: '',
  startDate: undefined as Date | undefined,
  endDate: undefined as Date | undefined,
});
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

  <div class="my-4">
    <div class="text-3xl font-bold">WeekPicker</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div class="flex justify-center">
      <XWeekPicker v-model:value="flux.weekPicker" />
    </div>

    <div class="mt-2">{{ flux.weekPicker }}</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Label</div>

    <div class="flex justify-center">
      <XWeekPicker v-model:value="flux.weekPicker" label="Label" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Disabled</div>

    <div class="flex justify-center">
      <XWeekPicker v-model:value="flux.weekPicker" label="Label" disabled />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors</div>

    <div class="flex justify-center">
      <XWeekPicker v-model:value="flux.weekPicker" :errorMessage="'This is a required field'" />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Errors with Label</div>

    <div class="flex justify-center">
      <XWeekPicker
        v-model:value="flux.weekPicker"
        label="Label"
        :errorMessage="'This is a required field'"
        required
      />
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">onChange</div>

    <div class="flex justify-center">
      <XWeekPicker
        v-model:value="flux.weekPicker"
        @change="
          (week, startDate, endDate) => {
            flux.startDate = startDate;
            flux.endDate = endDate;
          }
        "
      />
    </div>

    <div v-if="flux.startDate && flux.endDate" class="mt-2">
      <div>Week: {{ flux.weekPicker }}</div>
      <div>
        Range: {{ format(flux.startDate, 'yyyy/MM/dd') }} ~ {{ format(flux.endDate, 'yyyy/MM/dd') }}
      </div>
    </div>
  </div>
</template>
