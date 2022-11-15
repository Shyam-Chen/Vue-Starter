<script lang="ts" setup>
import { reactive } from 'vue';

const flux = reactive({
  status: true,
  toggle() {
    flux.status = !flux.status;
  },
});
</script>

<template>
  <div class="w-full">
    <div @click="flux.toggle">Title</div>

    <Transition name="fade">
      <div v-if="flux.status" class="p-4">Content</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
