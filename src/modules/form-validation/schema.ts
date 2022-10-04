import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import { useState } from './store';

export const useBasicFormsSchema = () => {
  const { t } = useI18n({ useScope: 'global' });
  const state = useState();

  const schema = useSchema(
    [
      [
        computed(() => state.basicForms.email),
        computed(() => string().required(t('required')).email()),
      ],
      [
        computed(() => state.basicForms.password),
        computed(() => string().required(t('required')).min(8)),
      ],
    ],
    state,
  );

  return schema;
};
