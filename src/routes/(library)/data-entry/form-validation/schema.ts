import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import { useState } from './provider';

const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

export const useZodFormSchema = () => {
  const state = useState();

  const string = () => z.string({ required_error: msgs.required });

  const schema = useZodSchema(
    z.object({
      username: string().nonempty(msgs.required),
      password: string().min(8, msgs.min).nonempty(msgs.required),
      email: string().email(msgs.email).nonempty(msgs.required),
    }),
    toRef(state, 'zodForm'),
    toRef(state, 'zodValdn'),
  );

  return schema;
};
