<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useLocale } from 'vue-localer';
import { useSwipe } from '@vueuse/core';

import Spinner from '../spinner/Spinner.vue';
import scrollableParent from '../../composables/scroll-parent/scrollableParent';

const emit = defineEmits<{
  (evt: 'refresh', done: () => void): void;
}>();

const locale = useLocale();

const content = ref<HTMLDivElement>();
const translateY = ref(0);
const isRefreshing = ref(false);
const isReleaseToRefresh = ref(false);
const preventScroll = ref(false);

const maxPullDistance = 80;

const { lengthY } = useSwipe(content, {
  threshold: 60,
  onSwipe() {
    const isAtTop = scrollableParent(content.value)?.scrollTop === 0;

    if (lengthY.value < 0 && isAtTop && !isRefreshing.value) {
      translateY.value = Math.min(-lengthY.value, maxPullDistance);
      preventScroll.value = true;

      if (translateY.value >= maxPullDistance) {
        isReleaseToRefresh.value = true;
      } else {
        isReleaseToRefresh.value = false;
      }
    }
  },
  onSwipeEnd(_, direction) {
    preventScroll.value = false;

    if (direction === 'down' && translateY.value >= maxPullDistance) {
      isRefreshing.value = true;
      translateY.value = maxPullDistance;
      emit('refresh', stopRefreshing);
    } else {
      translateY.value = 0;
    }
  },
});

function stopRefreshing() {
  isRefreshing.value = false;
  isReleaseToRefresh.value = false;
  translateY.value = 0;
}

onMounted(() => {
  document.addEventListener('touchmove', handlePreventScroll, { passive: false });
});

onBeforeUnmount(() => {
  document.removeEventListener('touchmove', handlePreventScroll);
});

function handlePreventScroll(event: TouchEvent) {
  if (preventScroll.value) {
    event.preventDefault();
  }
}
</script>

<template>
  <div class="PullToRefresh">
    <div
      class="PullToRefresh-Indicator"
      :style="{ transform: `translateY(${Math.abs(translateY)}px)` }"
    >
      <div v-if="!isRefreshing && translateY > 0">
        <div v-if="isReleaseToRefresh" class="flex flex-col items-center">
          <div class="i-material-symbols-arrow-warm-up-rounded size-5"></div>
          <div>{{ locale.releaseToRefresh || 'Release to refresh' }}</div>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="i-material-symbols-arrow-cool-down-rounded size-5"></div>
          <div>{{ locale.pullDownToRefresh || 'Pull down to refresh' }}</div>
        </div>
      </div>
      <Spinner v-if="isRefreshing" class="size-8" />
    </div>

    <div
      ref="content"
      class="PullToRefresh-Content"
      :style="{ transform: `translateY(${Math.abs(translateY)}px)` }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PullToRefresh {
  @apply relative h-full;
}

.PullToRefresh-Indicator {
  @apply absolute -top-20 w-full h-20 flex justify-center items-center;
  @apply transition-transform duration-300 ease-linear;
}

.PullToRefresh-Content {
  @apply h-full transition-transform duration-300 ease-linear;
}
</style>
