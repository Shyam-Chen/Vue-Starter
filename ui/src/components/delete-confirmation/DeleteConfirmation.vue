<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';

import Button from '../button/Button.vue';
import Dialog from '../dialog/Dialog.vue';
import TextField from '../text-field/TextField.vue';

const props = defineProps<{
  modelValue?: boolean;
  expected?: string;
  received?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (evt: 'update:modelValue', val: boolean): void;
  (evt: 'update:expected', val: string): void;
  (evt: 'delete'): void;
}>();

const localer = useLocaler();
const locale = useLocale();

const defaultModel = computed({
  get: () => props.modelValue || false,
  set: (val) => emit('update:modelValue', val),
});

const expectedModel = computed({
  get: () => props.expected || '',
  set: (val) => emit('update:expected', val),
});

const expectedLabel = computed(
  () =>
    localer.f(locale.value?.confirmDeletionLabel, { received: props.received }) ||
    `To confirm deletion, type "${props.received}" in the box below`,
);

watch(
  () => defaultModel.value,
  () => {
    expectedModel.value = '';
  },
);
</script>

<template>
  <Dialog
    v-model="defaultModel"
    :title="locale.confirmDeletion || 'Confirm Deletion?'"
    class="!w-150"
  >
    <div class="space-y-4">
      <div>
        {{
          locale.confirmDeletionContent || 'Once deleted, the data must be re-created if needed.'
        }}
      </div>

      <TextField v-model:value="expectedModel" :label="expectedLabel" />
    </div>

    <div class="flex justify-center gap-2 mt-8">
      <Button
        prepend="i-material-symbols-undo-rounded"
        :label="locale.cancel || 'Cancel'"
        color="secondary"
        @click="defaultModel = false"
      />

      <Button
        prepend="i-material-symbols-delete-outline-rounded"
        :label="locale.delete || 'Delete'"
        color="danger"
        :disabled="expectedModel !== received"
        :loading="loading"
        @click="emit('delete')"
      />
    </div>
  </Dialog>
</template>
