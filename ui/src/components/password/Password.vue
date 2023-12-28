<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref, computed } from 'vue';

import TextField from '../text-field/TextField.vue';
import Popover from '../popover/Popover.vue';

type TextFieldProps = ComponentProps<typeof TextField>;

interface Props extends /* @vue-ignore */ TextFieldProps {
  value?: string;
  meter?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
  (evt: 'focus', val: FocusEvent): void;
  (evt: 'blur', val: FocusEvent): void;
}>();

const valueModel = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});

const status = ref(false);
const show = ref(false);

function onFocus(evt: FocusEvent) {
  if (props.meter) status.value = true;
  emit('focus', evt);
}

function onBlur(evt: FocusEvent) {
  if (props.meter) status.value = false;
  emit('blur', evt);
}

const passed = 'i-material-symbols-check-small-rounded text-success-500';
const failed = 'i-material-symbols-close-small-rounded text-danger-500';

const min8Chars = /^.{10,}$/;
const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
const numbers = /[0-9]/;
const symbols = /[!@#$%^&*()+_\-=}{[\]|:;"/?><,`~]/; // !@#$%^&*()+_-=}{[]|:;"/?.><,`~
</script>

<template>
  <div>
    <Popover v-model="status" class="w-full">
      <TextField
        v-model:value="valueModel"
        v-bind="$attrs"
        :type="show ? 'text' : 'password'"
        :append="
          show
            ? 'i-material-symbols-visibility-off-outline-rounded'
            : 'i-material-symbols-visibility-outline-rounded'
        "
        @focus="onFocus"
        @blur="onBlur"
        @append="show = !show"
      />

      <template #content>
        <div class="p-4">
          <div class="text-sm font-semibold mb-2">Your password must contain:</div>

          <ul class="space-y-1 text-sm">
            <li class="flex items-center gap-1">
              <div class="w-5 h-5" :class="[min8Chars.test(valueModel) ? passed : failed]"></div>
              Minimum number of characters is 10.
            </li>
            <li class="flex items-center gap-1">
              <div class="w-5 h-5" :class="[lowercase.test(valueModel) ? passed : failed]"></div>
              Should contain lowercase.
            </li>
            <li class="flex items-center gap-1">
              <div class="w-5 h-5" :class="[uppercase.test(valueModel) ? passed : failed]"></div>
              Should contain uppercase.
            </li>
            <li class="flex items-center gap-1">
              <div class="w-5 h-5" :class="[numbers.test(valueModel) ? passed : failed]"></div>
              Should contain numbers.
            </li>
            <li class="flex items-center gap-1">
              <div class="w-5 h-5" :class="[symbols.test(valueModel) ? passed : failed]"></div>
              Should contain symbols.
            </li>
          </ul>
        </div>
      </template>
    </Popover>
  </div>
</template>
