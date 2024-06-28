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
        title: v.nullish(v.pipe(v.string(), v.minLength(1, valdnLocale.value.required)), ''),
      }),
    ),
    toRef(state, 'todoForm'),
    toRef(state, 'todoValdn'),
  );

  return schema;
};
