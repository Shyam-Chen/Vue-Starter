import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

export const useZodFormSchema = () => {
  const { state } = useStore();

  const string = () => z.string({ required_error: msgs.required });

  const schema = useZodSchema(
    z.object({
      username: string().nonempty(msgs.required),
      password: string().min(8, msgs.min).nonempty(msgs.required),
      email: string().email(msgs.email).nonempty(msgs.required),
      phone: string().nonempty(msgs.required),
      gender: string().nonempty(msgs.required),
      plan: string().nonempty(msgs.required),
    }),
    toRef(state, 'zodForm'),
    toRef(state, 'zodValdn'),
  );

  return schema;
};

export const useTouchSchema = () => {
  const { state } = useStore();

  const string = () => z.string({ required_error: msgs.required });

  const schema = useZodSchema(
    z.object({
      username: string().nonempty(msgs.required),
      password: string().min(8, msgs.min).nonempty(msgs.required),
    }),
    toRef(state, 'zodForm'),
    toRef(state, 'touchValdn'),
  );

  return schema;
};
