export default (el?: HTMLElement | null, axis?: 'x' | 'y'): HTMLElement | undefined => {
  if (!el) return undefined;

  let parent = el.parentElement;

  while (parent) {
    const { overflow } = window.getComputedStyle(parent);
    const hasScrollbarY = parent.scrollHeight > parent.clientHeight;
    const hasScrollbarX = parent.scrollWidth > parent.clientWidth;

    if (
      (overflow.includes('auto') || overflow.includes('scroll')) &&
      (axis === 'x' ? hasScrollbarX : axis === 'y' ? hasScrollbarY : hasScrollbarY || hasScrollbarX)
    ) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return document.documentElement;
};
