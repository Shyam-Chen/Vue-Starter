<script lang="ts" setup>
import { computed, ref } from 'vue';

import Collapse from '../collapse/Collapse.vue';

const defaultModel = defineModel<boolean>({ default: undefined });

const props = withDefaults(
  defineProps<{
    status?: boolean;
    title?: string;
  }>(),
  {
    status: true,
    title: '',
  },
);

const staticStatus = ref(props.status);

function toggleStatus() {
  if (typeof defaultModel.value === 'boolean') {
    defaultModel.value = !defaultModel.value;
  } else {
    staticStatus.value = !staticStatus.value;
  }
}

const _status = computed(() =>
  typeof defaultModel.value === 'boolean' ? defaultModel.value : staticStatus.value,
);
</script>

<template>
  <div class="Panel">
    <div class="Panel-Header" :class="{ active: _status }" @click="toggleStatus">
      <div class="text-xl font-medium flex-1">
        <slot name="header">{{ title }}</slot>
      </div>

      <div v-if="!_status" class="i-material-symbols-add-rounded w-6 h-6"></div>
      <div v-else class="i-material-symbols-check-indeterminate-small-rounded w-6 h-6"></div>
    </div>

    <Collapse>
      <div v-if="_status" class="Panel-Body">
        <div class="p-4 lg:p-6">
          <slot></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<style lang="scss" scoped>
.Panel {
  @apply w-full;
}

.Panel-Header {
  @apply flex items-center px-4 lg:px-6 py-3 lg:py-4;
  @apply text-zinc-600 dark:text-zinc-400 cursor-pointer shadow bg-white dark:bg-slate-800 transition rounded-md;

  &.active {
    @apply bg-gray-200 dark:bg-gray-700 rounded-t-md rounded-b-0;
  }
}

.Panel-Body {
  @apply rounded-b-md shadow bg-white dark:bg-slate-800;
}
</style>
