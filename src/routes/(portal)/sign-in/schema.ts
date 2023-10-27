import { computed, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { object, string, minLength } from 'valibot';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store';

export default () => {
  const messages = useValidationMessages();
  const { state } = useStore();

  const schema = useValibotSchema(
    computed(() =>
      object({
        username: string([minLength(1, messages.value.required)]),
        password: string([
          minLength(1, messages.value.required),
          minLength(8, messages.value.string?.min),
        ]),
      }),
    ),
    toRef(state, 'signInForm'),
    toRef(state, 'signInValdn'),
  );

  return schema;
};
