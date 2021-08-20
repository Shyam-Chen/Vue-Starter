import { provide, inject, reactive, computed } from 'vue';

const stateSymbol = Symbol('counter');

const createState = reactive({
  count: 0,
});

export const useState = () => inject(stateSymbol);

export const useActions = () => {
  const state = useState();

  return {
    increment() {
      state.count += 1;
    },
    decrement() {
      state.count -= 1;
    },
  };
};

export const useComputeds = () => {
  const state = useState();

  return {
    evenOrOdd: computed(() => (state.count % 2 === 0 ? 'Even' : 'Odd')),
  };
};

export default () => provide(stateSymbol, createState);
