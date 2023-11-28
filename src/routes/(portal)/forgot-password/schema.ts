import { computed, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useValdnLocale } from '@x/ui';
import { object, string, minLength, email } from 'valibot';

import useStore from './store';

export default () => {
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useValibotSchema(
    computed(() =>
      object({
        email: string([minLength(1, valdnLocale.value.required), email(valdnLocale.value.email)]),
      }),
    ),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
