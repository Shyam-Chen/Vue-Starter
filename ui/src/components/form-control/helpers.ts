import { computed } from 'vue';

import type { FormControlProps } from './types';

export const formControlDefaults: FormControlProps = {
  label: '',
  required: false,
  invalid: false,
  help: '',
  sub: false,
};

export const useFormControlAttrs = (props: FormControlProps) => {
  return computed(() => ({
    label: props.label,
    required: props.required,
    invalid: props.invalid,
    help: props.help,
    sub: props.sub,
  }));
};
