<script lang="ts" setup>
import { useLocale } from 'vue-localer';

const statusModel = defineModel<boolean>('status', { default: true });

withDefaults(
  defineProps<{
    label?: string;
    value?: string[];
    selectedLabels?: boolean;
  }>(),
  {
    label: '',
    value: () => [],
    selectedLabels: false,
  },
);

const locale = useLocale();
</script>

<template>
  <slot></slot>
  <div v-if="label" class="flex-1"></div>
  <div
    v-if="selectedLabels && value?.length"
    class="flex text-xs font-normal text-info-500 cursor-pointer"
    @click="statusModel = !statusModel"
  >
    <template v-if="statusModel">
      <span>{{ locale.show || 'Show' }}</span>
      <div class="i-material-symbols-add-rounded w-4 h-4"></div>
    </template>

    <template v-else>
      <span>{{ locale.hide || 'Hide' }}</span>
      <div class="i-material-symbols-check-indeterminate-small-rounded w-4 h-4"></div>
    </template>
  </div>
</template>
