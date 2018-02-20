export const updateModel = commitName => {
  const arr = commitName.split('.');

  if (arr.length === 1) {
    const module = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);

    return {
      [`update${module}`](state, { label, value }) {
        state[label] = value;
      }
    };
  }

  if (arr.length === 2) {
    const moduleParent = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
    const moduleChild = arr[1].charAt(0).toUpperCase() + arr[1].slice(1);

    return {
      [`update${moduleParent}${moduleChild}`](state, { label, value }) {
        state[label] = value;
      }
    };
  }
};

export default {
  ...updateModel('formControls.templateDriven')
};
