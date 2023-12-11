<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useLocaler, useLocale } from 'vue-localer';

import Dialog from '../dialog/Dialog.vue';
import TextField from '../text-field/TextField.vue';
import Button from '../button/Button.vue';
import Spinner from '../spinner/Spinner.vue';

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

const model = computed({
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
  () => model.value,
  () => {
    expectedModel.value = '';
  },
);
</script>

<template>
  <Dialog v-model="model" :title="locale.confirmDeletion || 'Confirm Deletion?'" class="!w-150">
    <div class="space-y-4">
      <div>
        {{
          locale.confirmDeletionContent || 'Once deleted, the data must be re-created if needed.'
        }}
      </div>

      <TextField v-model:value="expectedModel" :label="expectedLabel" />
    </div>

    <div class="flex justify-center gap-2 mt-8">
      <Button color="secondary" @click="model = false">
        <div class="i-mdi-undo w-5 h-5"></div>
        {{ locale.cancel || 'Cancel' }}
      </Button>

      <Button
        color="danger"
        :disabled="expectedModel !== received || loading"
        @click="emit('delete')"
      >
        <template v-if="loading">
          <Spinner class="w-5 h-5" />
        </template>

        <template v-else>
          <div class="i-mdi-delete-outline w-5 h-5"></div>
          {{ locale.delete || 'Delete' }}
        </template>
      </Button>
    </div>
  </Dialog>
</template>
