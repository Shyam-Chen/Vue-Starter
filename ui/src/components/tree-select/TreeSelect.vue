<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

import ChipField from '../chip-field/ChipField.vue';
import ToggleShowHide from '../chip-field/ToggleShowHide.vue';
import FormControl, { type FormControlProps, formControlDefaults } from '../form-control';
import Popover from '../popover/Popover.vue';
import Tree, { type Node } from '../tree';

defineOptions({ inheritAttrs: false });

const valueModel = defineModel<string[]>('value', { default: [] });

const props = withDefaults(
  defineProps<
    {
      options?: Node[];
      selectedLabels?: boolean;
    } & FormControlProps
  >(),
  {
    options: () => [],
    selectedLabels: false,
    ...formControlDefaults,
  },
);

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

const toggleShowHide = ref(true);
</script>

<template>
  <FormControl :label :required :invalid :help>
    <template #label>
      <ToggleShowHide v-model:status="toggleShowHide" :label :value :selectedLabels />
    </template>

    <template #default="{ id }">
      <Popover v-model="status" start class="w-full">
        <ChipField
          :id
          v-model:status="toggleShowHide"
          v-bind="{ ...$attrs, ...formControlDefaults }"
          :invalid="!!invalid"
          :value="displayChips"
          :append="
            status
              ? 'i-material-symbols-keyboard-arrow-up-rounded'
              : 'i-material-symbols-keyboard-arrow-down-rounded'
          "
          readonly
          :placeholder="valueModel.length ? '' : 'Please select'"
          :closable="false"
          :selectedLabels
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
    </template>
  </FormControl>
</template>
