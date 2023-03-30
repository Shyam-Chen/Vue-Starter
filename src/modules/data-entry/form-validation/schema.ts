import { computed, toRef } from 'vue';
import { useYupSchema, useZodSchema } from 'vue-formor';
import { string } from 'yup';
import { z } from 'zod';

import { useState } from './provider';

const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

export const useYupFormSchema = () => {
  const state = useState();

  const schema = useYupSchema(
    [
      [computed(() => state.yupForm.username), computed(() => string().required(msgs.required))],
      [
        computed(() => state.yupForm.password),
        computed(() => string().required(msgs.required).min(8, msgs.min)),
      ],
      [
        computed(() => state.yupForm.email),
        computed(() => string().required(msgs.required).email(msgs.email)),
      ],
    ],
    state,
    'yupValdn',
  );

  return schema;
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
