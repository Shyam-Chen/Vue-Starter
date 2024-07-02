<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

import FormControl from '../form-control/FormControl.vue';
import Popover from '../popover/Popover.vue';
import ChipField from '../chip-field/ChipField.vue';
import Tree from '../tree';
import type { Node } from '../tree/types';

const valueModel = defineModel<string[]>('value', { default: [] });

const props = defineProps<{
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

const flatten = (options: Node[] = []) => {
  const flatArray: Node[] = [];

  const traverse = (options: Node[]) => {
    for (const option of options) {
      flatArray.push({ label: option.label, value: option.value });
      if (option.children) traverse(option.children);
    }
  };

  traverse(options);

  return flatArray;
};

const flattenOptions = computed(() => flatten(props.options));

const displayChips = computed(() => {
  const selected = flattenOptions.value.filter((opt) =>
    valueModel.value.includes(opt.value as string),
  );

  return selected.map((opt) => opt.label || '');
});
</script>

<template>
  <FormControl v-slot="{ uid }" :required :invalid :help>
    <Popover v-model="status" start class="w-full">
      <ChipField
        :id="uid"
        v-bind="$attrs"
        :label
        :value="displayChips"
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
