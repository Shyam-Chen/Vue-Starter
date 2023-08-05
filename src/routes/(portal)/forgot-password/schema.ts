import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store';

export default () => {
  const messages = useValidationMessages();

  const { state } = useStore();

  const string = () => z.string({ required_error: messages.value.required });

  const schema = useZodSchema(
    z.object({
      email: string().email(messages.value.email).nonempty(messages.value.required),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
