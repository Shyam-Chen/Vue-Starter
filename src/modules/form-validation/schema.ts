import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import { useState } from './store';

export const useBasicFormsSchema = () => {
  const state = useState();

  const schema = useSchema(
    [
      [computed(() => state.basicForms.email), string().required().email()],
      [computed(() => state.basicForms.password), string().required().min(8)],
    ],
    state,
  );

  return schema;
};
