const getScrollableParent = (node: Node | ParentNode | null): HTMLElement | null => {
  const isElement = node instanceof HTMLElement;
  const overflow = isElement && window.getComputedStyle(node).overflow;
  const isScrollable = overflow !== 'visible' && overflow !== 'hidden';
  const hasScrollbarY = isElement && node.scrollHeight > node.clientHeight;
  const hasScrollbarX = isElement && node.scrollWidth > node.clientWidth;

  if (!node) return null;
  if (isScrollable && (hasScrollbarY || hasScrollbarX)) return node;
  return getScrollableParent(node.parentNode) || document.body;
};

export default getScrollableParent;
