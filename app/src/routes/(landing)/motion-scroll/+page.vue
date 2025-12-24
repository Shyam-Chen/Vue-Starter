<script lang="ts" setup>
import { Motion } from 'motion-v';
</script>

<template>
  <!-- Spacer to force scroll -->
  <div class="h-screen flex items-center justify-center">
    <p class="text-xl text-gray-500 animate-bounce">Scroll down ↓</p>
  </div>

  <div class="flex flex-col items-center py-20 overflow-hidden">
    <div class="flex flex-col gap-12 w-full max-w-4xl px-6">
      <!-- Line 1: Appears from Left to Right -->
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :in-view="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 self-start"
      >
        Driven by Motion
      </Motion>

      <!-- Line 2: Appears from Right to Left -->
      <Motion
        :initial="{ opacity: 0, x: 100 }"
        :in-view="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, ease: 'easeOut', delay: 0.2 }"
        class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 self-end text-right"
      >
        Limitless Possibilities
      </Motion>
    </div>
  </div>

  <!-- Extra space at bottom -->
  <div class="h-screen"></div>
</template>
