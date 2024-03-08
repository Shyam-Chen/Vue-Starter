const scrollableParent = (node?: Node | ParentNode | null): HTMLElement | undefined => {
  const isElement = node instanceof HTMLElement;
  const overflow = isElement && window.getComputedStyle(node).overflow;
  const isScrollable = overflow !== 'visible' && overflow !== 'hidden';
  const hasScrollbarY = isElement && node.scrollHeight > node.clientHeight;
  const hasScrollbarX = isElement && node.scrollWidth > node.clientWidth;

  if (!node) return undefined;
  if (isScrollable && (hasScrollbarY || hasScrollbarX)) return node;
  return scrollableParent(node.parentNode);
};

export default scrollableParent;
