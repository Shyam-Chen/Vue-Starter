import { computed, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store';

export default () => {
  const messages = useValidationMessages();
  const { state } = useStore();

  const schema = useZodSchema(
    computed(() =>
      z.object({
        username: z.string().nonempty(messages.value.required),
        password: z
          .string()
          .min(8, messages.value.string?.min)
          .nonempty(messages.value.required),
      }),
    ),
    toRef(state, 'signInForm'),
    toRef(state, 'errors'),
  );

  return schema;
};
