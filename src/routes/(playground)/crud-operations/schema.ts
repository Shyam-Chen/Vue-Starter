import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import { useState } from './provider';

export const useCrudOperationsSchema = () => {
  const state = useState();

  const schema = useSchema(
    [[computed(() => state.todoItem.title), computed(() => string().required())]],
    state,
  );

  return schema;
};
