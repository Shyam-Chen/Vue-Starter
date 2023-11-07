import { computed, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useValdnMsg } from '@x/ui';
import { object, string, minLength } from 'valibot';

import useStore from './store';

export default () => {
  const valdnMsg = useValdnMsg();

  const { state } = useStore();

  const schema = useValibotSchema(
    computed(() =>
      object({
        username: string([minLength(1, valdnMsg.value.required)]),
        password: string([
          minLength(1, valdnMsg.value.required),
          minLength(8, valdnMsg.value.string?.min),
        ]),
      }),
    ),
    toRef(state, 'signInForm'),
    toRef(state, 'signInValdn'),
  );

  return schema;
};
