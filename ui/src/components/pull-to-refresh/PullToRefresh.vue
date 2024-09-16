<script lang="ts" setup>
import { ref } from 'vue';
import { useSwipe } from '@vueuse/core';

import Spinner from '../spinner/Spinner.vue';

const emit = defineEmits<{
  (evt: 'refresh', done: () => void): void;
}>();

const container = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const translateY = ref(0);
const isRefreshing = ref(false);

const { lengthY } = useSwipe(content, {
  passive: false,
  onSwipe() {
    if (lengthY.value < 0 && !isRefreshing.value) {
      translateY.value = Math.min(lengthY.value, 100);
    }
  },
  onSwipeEnd(_, direction) {
    if (direction === 'down' && translateY.value < 50) {
      isRefreshing.value = true;
      translateY.value = 50;
      emit('refresh', stopRefreshing);
    } else {
      translateY.value = 0;
    }
  },
});

function stopRefreshing() {
  isRefreshing.value = false;
  translateY.value = 0;
}
</script>

<template>
  <div ref="container" class="PullToRefresh">
    <div
      class="PullToRefresh-Indicator"
      :style="{ transform: `translateY(${Math.abs(translateY)}px)` }"
    >
      {{ translateY }}<br />
      {{ lengthY }}
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
  overflow-y: auto;
  position: relative;
}

.PullToRefresh-Indicator {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s ease;
  width: 100px;
  height: 2rem;
}

.PullToRefresh-Content {
  transition: transform 0.3s ease;
}
</style>
