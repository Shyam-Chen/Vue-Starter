<script lang="ts" setup>
import { reactive, readonly } from 'vue';
import { XBreadcrumb, XButton, XDeleteConfirmation } from '@x/ui';
import { useNotification } from '@x/ui';

const notification = useNotification();

const state = reactive({
  deleteDialog: false,
  deleteExpected: '',
  deleteContent: { received: 'Test' },
  deleteLoading: false,
});

const actions = readonly({
  delete() {
    notification.actions.add({
      message: 'Successfully Deleted',
      color: 'success',
      icon: 'i-mdi-checkbox-marked-circle-outline',
    });

    state.deleteDialog = false;
  },
});
</script>

<template>
  <XBreadcrumb
    :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'DeleteConfirmation' }]"
  />

  <h1 class="text-4xl font-extrabold my-4">DeleteConfirmation</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XButton color="danger" @click="state.deleteDialog = true">
      <div class="i-mdi-delete-outline w-5 h-5"></div>
      Delete
    </XButton>

    <XDeleteConfirmation
      v-model="state.deleteDialog"
      v-model:expected="state.deleteExpected"
      :received="state.deleteContent.received"
      :loading="state.deleteLoading"
      @delete="actions.delete"
    />
  </section>
</template>
