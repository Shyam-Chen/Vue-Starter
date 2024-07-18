<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref } from 'vue';
import { useLocale } from 'vue-localer';

import FormControl from '../form-control/FormControl.vue';
import Popover from '../popover/Popover.vue';
import TextField from '../text-field/TextField.vue';

type TextFieldProps = ComponentProps<typeof TextField>;

interface Props extends /* @vue-ignore */ TextFieldProps {
  label?: string;
  meter?: boolean;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
}

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<string>('value', { default: '' });

defineProps<Props>();

const locale = useLocale();

const status = ref(false);
const show = ref(false);

const passed = 'i-material-symbols-check-small-rounded text-success-500';
const failed = 'i-material-symbols-close-small-rounded text-danger-500';

const min10Chars = /^.{10,}$/;
const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
const numbers = /[0-9]/;
const symbols = /[!@#$%^&*()+_\-=}{[\]|:;"/?><,`~]/; // !@#$%^&*()+_-=}{[]|:;"/?.><,`~
</script>

<template>
  <FormControl v-slot="{ uid }" :label :required :invalid :help>
    <Popover v-model="status" start class="w-full">
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
          <div class="text-sm font-semibold mb-2">
            {{ locale.passwordMeterTitle || 'Your password must contain:' }}
          </div>

          <ul class="space-y-1 text-sm">
            <li class="flex items-center gap-1">
              <div class="size-5" :class="[min10Chars.test(valueModel) ? passed : failed]"></div>
              {{ locale.passwordRuleMin10Chars || 'Minimum number of characters is 10.' }}
            </li>
            <li class="flex items-center gap-1">
              <div class="size-5" :class="[lowercase.test(valueModel) ? passed : failed]"></div>
              {{ locale.passwordRuleLowercase || 'Should contain lowercase.' }}
            </li>
            <li class="flex items-center gap-1">
              <div class="size-5" :class="[uppercase.test(valueModel) ? passed : failed]"></div>
              {{ locale.passwordRuleUppercase || 'Should contain uppercase.' }}
            </li>
            <li class="flex items-center gap-1">
              <div class="size-5" :class="[numbers.test(valueModel) ? passed : failed]"></div>
              {{ locale.passwordRuleNumbers || 'Should contain numbers.' }}
            </li>
            <li class="flex items-center gap-1">
              <div class="size-5" :class="[symbols.test(valueModel) ? passed : failed]"></div>
              {{ locale.passwordRuleSymbols || 'Should contain symbols.' }}
            </li>
          </ul>
        </div>
      </template>
    </Popover>
  </FormControl>
</template>
