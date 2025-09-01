import { useValdnLocale } from '@x/ui';
import * as v from 'valibot';
import { computed, toRef } from 'vue';
import { useSchema } from 'vue-formor';

import useStore from './store';

export default () => {
  const valdnLocale = useValdnLocale();

  const { state } = useStore();

  const schema = useSchema(
    computed(() =>
      v.object({
        username: v.nullish(
          v.pipe(
            v.string(),
            v.minLength(1, valdnLocale.value.required),
            state.userForm.username?.includes('@')
              ? v.email(valdnLocale.value.email)
              : v.check((input) => {
                  if (input) return /^(?!.*\.{2})[A-Za-z0-9][A-Za-z0-9.]*[A-Za-z0-9]$/.test(input);
                  return true;
                }, `Only English letters, numbers, and dots are allowed. Dots cannot be consecutive, nor at the beginning or end.`),
          ),
          '',
        ),
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
    toRef(state, 'userForm'),
    toRef(state, 'userValdn'),
    toRef(state, 'userTouched'),
  );

  return schema;
};
