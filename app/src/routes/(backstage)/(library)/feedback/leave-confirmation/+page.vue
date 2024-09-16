<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XLeaveConfirmation, XTextField } from '@x/ui';

const initText = ref('');
const text = ref('');
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'LeaveConfirmation' }]"
  />

  <h1 class="text-4xl font-extrabold my-4">LeaveConfirmation</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XTextField v-model:value="text" label="Label" />

      <div class="text-gray-400 dark:text-gray-500 text-xs mt-1">
        After entering text, leaving the page triggers a confirmation dialog before exiting.
      </div>
    </XCard>
  </section>

  <XLeaveConfirmation :trigger="initText !== text" />
</template>
