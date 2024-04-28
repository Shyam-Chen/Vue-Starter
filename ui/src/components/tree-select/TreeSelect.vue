<script lang="ts" setup>
import { ref } from 'vue';

import FormControl from '../form-control/FormControl.vue';
import Popover from '../popover/Popover.vue';
import TextField from '../text-field/TextField.vue';
import Tree from '../tree';

const valueModel = defineModel<string[]>('value', { default: [] });

defineProps<{
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
}>();

const status = ref(false);

const nodesData = [
  {
    label: '1',
    value: '1',
    children: [
      {
        label: '1-1',
        value: '1-1',
        children: [
          { label: '1-1-1', value: '1-1-1' },
          { label: '1-1-2', value: '1-1-2' },
        ],
      },
      {
        label: '1-2',
        value: '1-2',
        children: [
          { label: '1-2-1', value: '1-2-1' },
          { label: '1-2-2', value: '1-2-2' },
        ],
      },
      {
        label: '1-3',
        value: '1-3',
        children: [
          { label: '1-3-1', value: '1-3-1' },
          {
            label: '1-3-2',
            value: '1-3-2',
            children: [
              { label: '1-3-2-1', value: '1-3-2-1' },
              { label: '1-3-2-2', value: '1-3-2-2' },
            ],
          },
          { label: '1-3-3', value: '1-3-3' },
        ],
      },
    ],
  },
  {
    label: '2',
    value: '2',
    children: [
      {
        label: '2-1',
        value: '2-1',
        children: [
          {
            label: '2-1-1',
            value: '2-1-1',
            children: [
              { label: '2-1-1-1', value: '2-1-1-1' },
              { label: '2-1-1-2', value: '2-1-1-2' },
            ],
          },
          { label: '2-1-2', value: '2-1-2' },
        ],
      },
      { label: '2-2', value: '2-2' },
    ],
  },
  { label: '3', value: '3' },
];
</script>

<template>
  <FormControl v-slot="{ uid }" :label :required :invalid :help>
    <Popover v-model="status" class="w-full">
      <TextField
        :id="uid"
        v-model:value="valueModel"
        v-bind="$attrs"
        :append="
          status
            ? 'i-material-symbols-keyboard-arrow-up-rounded'
            : 'i-material-symbols-keyboard-arrow-down-rounded'
        "
        :invalid="!!invalid"
        @click="status = !status"
        @append="status = !status"
      />

      <template #content>
        <div class="p-2">
          <Tree :nodes="nodesData" multiple />
        </div>
      </template>
    </Popover>
  </FormControl>
</template>
