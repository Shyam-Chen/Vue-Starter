export type FormControlProps = {
  label?: string;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
};

export const formControlDefaults: FormControlProps = {
  label: '',
  required: false,
  invalid: false,
  help: '',
};
