<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';
// import Button from '~/components/Button.vue';

const tour = ref();
const el1 = ref();

onMounted(() => {
  nextTick(() => {
    const rect = el1.value.getBoundingClientRect();

    tour.value.style.width = `${rect.width}px`;
    tour.value.style.height = `${rect.height}px`;
    tour.value.style.left = `${rect.x}px`;
    tour.value.style.top = `${rect.y}px`;
  });
});
</script>

<template>
  <Breadcrumbs
    :items="[
      { text: 'Platform', disabled: true },
      { text: 'Navigation', disabled: true },
      { text: 'Tours', disabled: true },
    ]"
    class="mb-4"
  />

  <div
    ref="tour"
    class="fixed z-101 pointer-events-none"
    style="box-shadow: rgba(33, 33, 33, 0.5) 0 0 0 3333px"
  ></div>

  <div class="mb-4">
    <div ref="el1" class="text-3xl font-bold">Tours</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Columns 1</div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 border rounded shadow bg-slate-300">
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Columns 2</div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 border rounded shadow bg-slate-300">
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Columns 3</div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 border rounded shadow bg-slate-300">
        {{ num }}
      </div>
    </div>
  </div>
</template>
