/* @unocss-include */

import { useIntersectionObserver } from '@vueuse/core';
import type { ComputedRef } from 'vue';
import { computed, onMounted, toRef, toValue, watch } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

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
      const el = sections.value[i].el;

      if (el instanceof Element) {
        el.classList.add('scroll-mt-24');
      } else {
        el?.$el.classList.add('scroll-mt-24');
      }

      useIntersectionObserver(
        sections.value[i].el,
        ([entry]) => {
          sections.value[i].status = entry.isIntersecting;
        },
        { rootMargin: '-12.5% 0px' },
      );

      sections.value[i].clickItem = () => {
        const el = sections.value[i].el;

        if (el instanceof Element) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          el?.$el.scrollIntoView({ behavior: 'smooth' });
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

  return sections;
};
