import { computed, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import { useValdnLocale } from '@x/ui';
import * as v from 'valibot';

import useStore from './store';

export default () => {
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useSchema(
    computed(() =>
      v.object({
        email: v.nullish(
          v.pipe(
            v.string(),
            v.minLength(1, valdnLocale.value.required),
            v.email(valdnLocale.value.email),
          ),
          '',
        ),
      }),
    ),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
