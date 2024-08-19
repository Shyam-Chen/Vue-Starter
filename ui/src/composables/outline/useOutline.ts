import type { ComputedRef } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';
import { toRef, toValue, computed, onMounted, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

import type Outline from '../../components/outline/Outline.vue';

type OutlineProps = ComponentProps<typeof Outline>;

export default (items: OutlineProps['items'] | ComputedRef<OutlineProps['items']>) => {
  const _sections = toRef(toValue(items));

  const sections = computed({
    get: () => _sections.value || [],
    set: (val) => (_sections.value = val),
  });

  onMounted(() => {
    for (let i = 0; i < sections.value.length; i++) {
      // @ts-expect-error TODO
      sections.value[i].intersectionObserver = useIntersectionObserver(
        // @ts-expect-error TODO
        sections.value[i].el,
        ([entry]) => {
          sections.value[i].status = entry.isIntersecting;
        },
        { rootMargin: '-33.33% 0px' },
      );

      sections.value[i].clickItem = () => {
        // @ts-expect-error TODO
        if (sections.value[i].el.$el) {
          // @ts-expect-error TODO
          sections.value[i].el.$el.scrollIntoView({ behavior: 'smooth' });
        } else if (sections.value[i].el instanceof Element) {
          // @ts-expect-error TODO
          sections.value[i].el.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
  });

  // The input parameter should be `computed` for handling multiple languages.
  // When the language changes, the text should be updated accordingly.
  watch(
    () => (items as ComputedRef<OutlineProps['items']>)?.value,
    (val) => {
      if (val?.length && _sections.value?.length) {
        for (let i = 0; i < val.length; i++) {
          _sections.value[i].text = val[i].text;
        }
      }
    },
  );

  return sections as ComputedRef<OutlineProps['items']>;
};
