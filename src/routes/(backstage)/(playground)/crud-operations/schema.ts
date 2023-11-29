import { computed, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useValdnLocale } from '@x/ui';
import { optional, object, string, minLength } from 'valibot';

import useStore from './store';

export const useCrudOperationsSchema = () => {
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useValibotSchema(
    computed(() =>
      object({
        title: optional(string([minLength(1, valdnLocale.value.required)]), ''),
      }),
    ),
    toRef(state, 'todoItem'),
    toRef(state, 'errors'),
  );

  return schema;
};
