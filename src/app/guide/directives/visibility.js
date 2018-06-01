export const handler = (el, binding) => {
  const input = el.querySelector('input');
  input.type = binding.value ? 'text' : 'password';
};

export default {
  bind: handler,
  update: handler,
};
