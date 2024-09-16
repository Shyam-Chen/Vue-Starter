import type { Ref } from 'vue';
import { ref, watch, onMounted, onUnmounted } from 'vue';

import scrollableParent from './scrollableParent';

export default (target: Ref<HTMLElement | undefined> | undefined, handleScroll: () => void) => {
  const scrollParent = ref<HTMLElement>();
  const scrollGrandparent = ref<HTMLElement>();

  watch(
    () => target?.value,
    (el) => {
      scrollParent.value = scrollableParent(el);
      scrollParent.value?.addEventListener('scroll', handleScroll);

      scrollGrandparent.value = scrollableParent(scrollParent.value?.parentElement);
      scrollGrandparent.value?.addEventListener('scroll', handleScroll);
    },
  );

  onMounted(() => {
    document.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    document.removeEventListener('scroll', handleScroll);
    scrollParent.value?.removeEventListener('scroll', handleScroll);
    scrollGrandparent.value?.removeEventListener('scroll', handleScroll);
  });
};
