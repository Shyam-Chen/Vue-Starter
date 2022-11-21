import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const state = useState();

  const schema = useSchema([], state);

  return schema;
};
