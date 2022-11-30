import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import { useState } from './provider';

export const useCrudOperationsSchema = () => {
  const { t } = useI18n({ useScope: 'global' });
  const state = useState();

  const schema = useSchema(
    [[computed(() => state.todoItem.title), computed(() => string().required(t('required')))]],
    state,
  );

  return schema;
};
