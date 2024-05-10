<script lang="ts" setup>
import { ref } from 'vue';

import FormControl from '../form-control/FormControl.vue';
import Popover from '../popover/Popover.vue';
import ChipField from '../chip-field/ChipField.vue';
import Tree from '../tree';
import type { Node } from '../tree/types';

const valueModel = defineModel<string[]>('value', { default: [] });

defineProps<{
  options?: Node[];
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
}>();

const status = ref(false);
</script>

<template>
  <FormControl v-slot="{ uid }" :label :required :invalid :help>
    <Popover v-model="status" class="w-full">
      <ChipField
        :id="uid"
        v-model:value="valueModel"
        v-bind="$attrs"
        :append="
          status
            ? 'i-material-symbols-keyboard-arrow-up-rounded'
            : 'i-material-symbols-keyboard-arrow-down-rounded'
        "
        :invalid="!!invalid"
        readonly
        :placeholder="'Please select'"
        @click="status = !status"
        @append="status = !status"
      />

      <template #content>
        <div class="p-2">
          <Tree v-model="valueModel" :nodes="options" multiple />
        </div>
      </template>
    </Popover>
  </FormControl>
</template>
