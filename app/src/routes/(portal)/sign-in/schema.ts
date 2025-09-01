import { useValdnLocale } from '@x/ui';
import * as v from 'valibot';
import { computed, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';

import useStore from './store';

export default () => {
  const localer = useLocaler();
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useSchema(
    computed(() =>
      v.object({
        username: v.nullish(v.pipe(v.string(), v.minLength(1, valdnLocale.value.required)), ''),
        password: v.nullish(
          v.pipe(
            v.string(),
            v.minLength(1, valdnLocale.value.required),
            v.minLength(8, localer.f(valdnLocale.value.minLength, [8])),
          ),
          '',
        ),
      }),
    ),
    toRef(state, 'signInForm'),
    toRef(state, 'signInValdn'),
  );

  return schema;
};
