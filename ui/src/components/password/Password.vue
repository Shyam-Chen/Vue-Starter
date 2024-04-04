<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref } from 'vue';

import FormControl from '../form-control/FormControl.vue';
import TextField from '../text-field/TextField.vue';
import Popover from '../popover/Popover.vue';

type TextFieldProps = ComponentProps<typeof TextField>;

interface Props extends /* @vue-ignore */ TextFieldProps {
  label?: string;
  value?: string;
  meter?: boolean;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
}

const valueModel = defineModel<string>('value', { default: '' });

defineProps<Props>();

const status = ref(false);
const show = ref(false);

const passed = 'i-material-symbols-check-small-rounded text-success-500';
const failed = 'i-material-symbols-close-small-rounded text-danger-500';

const min8Chars = /^.{10,}$/;
const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
const numbers = /[0-9]/;
const symbols = /[!@#$%^&*()+_\-=}{[\]|:;"/?><,`~]/; // !@#$%^&*()+_-=}{[]|:;"/?.><,`~
</script>

<template>
  <FormControl v-slot="{ uid }" :label :required :invalid :help>
    <Popover v-model="status" class="w-full">
      <div class="w-full" @click="meter && (status = true)">
        <TextField
          :id="uid"
          v-model:value="valueModel"
          v-bind="$attrs"
          :type="show ? 'text' : 'password'"
          :append="
            show
              ? 'i-material-symbols-visibility-off-outline-rounded'
              : 'i-material-symbols-visibility-outline-rounded'
          "
          :invalid="!!invalid"
          @append="show = !show"
        />
      </div>

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
  </FormControl>
</template>
