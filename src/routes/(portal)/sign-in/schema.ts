import { computed, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import { useValdnLocale } from '@x/ui';
import { object, string, minLength } from 'valibot';

import useStore from './store';

export default () => {
  const localer = useLocaler();
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useValibotSchema(
    computed(() =>
      object({
        username: string([minLength(1, valdnLocale.value.required)]),
        password: string([
          minLength(1, valdnLocale.value.required),
          minLength(8, localer.f(valdnLocale.value.minLength, [8])),
        ]),
      }),
    ),
    toRef(state, 'signInForm'),
    toRef(state, 'signInValdn'),
  );

  return schema;
};
