<script lang="ts" setup>
import { ref } from 'vue';

import TextField from '../text-field/TextField.vue';
import Popover from '../popover/Popover.vue';

const status = ref(false);
</script>

<template>
  <div>
    <Popover v-model="status" class="w-full">
      <TextField v-bind="$attrs" type="password" @focus="status = true" @blur="status = false" />

      <template #content>
        <div class="p-4">
          <div class="text-sm font-semibold mb-2">Your password must contain:</div>

          <ul class="space-y-1 text-sm">
            <li class="flex items-center gap-1">
              <div class="i-material-symbols-check-small-rounded w-5 h-5"></div>
              Minimum number of characters is 8.
            </li>
            <li class="flex items-center gap-1">
              <div class="i-material-symbols-close-small-rounded w-5 h-5"></div>
              Should contain lowercase.
            </li>
            <li class="flex items-center gap-1">
              <div class="i-material-symbols-close-small-rounded w-5 h-5"></div>
              Should contain uppercase.
            </li>
            <li class="flex items-center gap-1">
              <div class="i-material-symbols-check-small-rounded w-5 h-5"></div>
              Should contain numbers.
            </li>
            <li class="flex items-center gap-1">
              <div class="i-material-symbols-close-small-rounded w-5 h-5"></div>
              Should contain special characters.
            </li>
          </ul>
        </div>
      </template>
    </Popover>
  </div>
</template>
