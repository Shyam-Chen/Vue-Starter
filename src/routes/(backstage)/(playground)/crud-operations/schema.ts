import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
};

export const useCrudOperationsSchema = () => {
  const { state } = useStore();

  const schema = useZodSchema(
    z.object({
      title: z.string({ required_error: msgs.required }).nonempty(msgs.required),
    }),
    toRef(state, 'todoItem'),
    toRef(state, 'errors'),
  );

  return schema;
};
