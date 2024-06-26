export default (node?: HTMLElement | null): HTMLElement | undefined => {
  if (!node) return undefined;

  let parent = node.parentElement;

  while (parent) {
    const { overflow } = window.getComputedStyle(parent);
    if (overflow.split(' ').every((o) => o === 'auto' || o === 'scroll')) return parent;
    parent = parent.parentElement;
  }

  return document.documentElement;
};
