import { computed, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useValdnLocale } from '@x/ui';
import { object, nullish, string, minLength } from 'valibot';

import useStore from './store';

export default () => {
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useValibotSchema(
    computed(() =>
      object({
        title: nullish(string([minLength(1, valdnLocale.value.required)]), ''),
      }),
    ),
    toRef(state, 'todoForm'),
    toRef(state, 'todoValdn'),
  );

  return schema;
};
