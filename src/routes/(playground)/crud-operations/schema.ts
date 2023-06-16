import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import { useState } from './provider';

const msgs = {
  required: `This is a required field`,
};

export const useCrudOperationsSchema = () => {
  const state = useState();

  const schema = useZodSchema(
    z.object({
      title: z.string({ required_error: msgs.required }).nonempty(msgs.required),
    }),
    toRef(state, 'todoItem'),
    toRef(state, 'errors'),
  );

  return schema;
};
