import { provide, inject, reactive, computed } from 'vue';

const stateSymbol = Symbol('counter');

const createState = reactive({
  signInForm: {
    username: '',
    password: '',
  },
  errors: {},
});

export const useState = () => inject(stateSymbol);

export const useActions = () => {
  const state = useState();

  return {
    signIn() {
      console.log('Sign-in');
    },
  };
};

export const useComputeds = () => {
  const state = useState();

  return {};
};

export default () => provide(stateSymbol, createState);
