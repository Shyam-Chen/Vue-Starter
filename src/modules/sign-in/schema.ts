import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const { t } = useI18n({ useScope: 'global' });
  const state = useState();

  const schema = useSchema(
    [
      [computed(() => state.signInForm.username), computed(() => string().required(t('required')))],
      [
        computed(() => state.signInForm.password),
        computed(() => string().required(t('required')).min(8, t('string.min'))),
      ],
    ],
    state,
  );

  return schema;
};
