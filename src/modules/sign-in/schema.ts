import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import useValidationMessages from '~/composables/useValidationMessages';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const messages = $(useValidationMessages());
  const state = useState();

  const schema = useSchema(
    [
      [
        computed(() => state.signInForm.username),
        computed(() => string().required(messages.required)),
      ],
      [
        computed(() => state.signInForm.password),
        computed(() => string().required(messages.required).min(8, messages.string?.min)),
      ],
    ],
    state,
  );

  return schema;
};
