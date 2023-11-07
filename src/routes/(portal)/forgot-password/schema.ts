import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { useValdnMsg } from '@x/ui';
import { z } from 'zod';

import useStore from './store';

export default () => {
  const valdnMsg = useValdnMsg();

  const { state } = useStore();

  const string = () => z.string({ required_error: valdnMsg.value.required });

  const schema = useZodSchema(
    z.object({
      email: string().email(valdnMsg.value.email).nonempty(valdnMsg.value.required),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
