import { computed } from 'vue';

export type FormControlProps = {
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
  sub?: boolean;
};

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
