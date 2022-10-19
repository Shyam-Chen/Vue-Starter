import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import {} from 'yup';

import { useState } from './provider';

export const use__FEATURE_NAME__Schema = () => {
  const state = useState();

  const schema = useSchema([], state);

  return schema;
};
