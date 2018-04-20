export const handler = (el, binding) => {
  const input = el.querySelector('input');
  input.type = binding.value ? 'password' : 'text';
};

export default {
  bind: handler,
  update: handler,
};
