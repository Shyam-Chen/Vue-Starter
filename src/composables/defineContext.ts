import { onUnmounted, provide } from 'vue';
import cloneDeep from 'lodash/cloneDeep';

export default (name: string | symbol, state: any, reset = true) => {
  if (reset) {
    const initialState = cloneDeep(state);

    onUnmounted(() => {
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
    });
  }

  provide(name, state);
};
