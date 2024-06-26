<script lang="ts" setup>
import { ref, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

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

const popover = inject('Popover', { withinPopover: false });

const target = ref<HTMLDivElement>();
const status = ref(false);

if (popover.withinPopover) {
  onClickOutside(target, () => {
    status.value = false;
  });
}
</script>

<template>
  <FormControl v-slot="{ uid }" :label :required :invalid :help>
    <Popover v-model="status" start class="w-full">
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
        :placeholder="valueModel.length ? '' : 'Please select'"
        :closable="false"
        :class="{ '!w-0': valueModel.length }"
        @focus="status = !status"
        @append="status = !status"
      />

      <template #content>
        <div ref="target" class="p-2 max-h-50 overflow-auto">
          <Tree v-model="valueModel" :nodes="options" multiple />
        </div>
      </template>
    </Popover>
  </FormControl>
</template>
