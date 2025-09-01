<script lang="ts" setup>
import { useNotification, XBreadcrumb, XButton, XCard, XDeleteConfirmation } from '@x/ui';
import { reactive, readonly } from 'vue';

const notification = useNotification();

const state = reactive({
  deleteDialog: false,
  deleteExpected: '',
  deleteContent: { received: 'Test' },
  deleteLoading: false,
});

const actions = readonly({
  async delete() {
    state.deleteLoading = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    state.deleteLoading = false;
    state.deleteDialog = false;

    notification.actions.add({
      message: 'Successfully Deleted',
      color: 'success',
    });
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

    <XCard>
      <XButton
        prepend="i-material-symbols-delete-outline-rounded"
        label="Delete"
        color="danger"
        @click="state.deleteDialog = true"
      />

      <XDeleteConfirmation
        v-model="state.deleteDialog"
        v-model:expected="state.deleteExpected"
        :received="state.deleteContent.received"
        :loading="state.deleteLoading"
        @delete="actions.delete"
      />
    </XCard>
  </section>
</template>
