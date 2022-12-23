import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const state = useState();

  const schema = useSchema(
    [
      [computed(() => state.signInForm.username), computed(() => string().required())],
      [computed(() => state.signInForm.password), computed(() => string().required().min(8))],
      [computed(() => state.signInForm.email), computed(() => string().required().email())],
    ],
    state,
  );

  return schema;
};
