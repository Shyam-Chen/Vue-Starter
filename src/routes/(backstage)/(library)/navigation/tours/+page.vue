<script lang="ts" setup>
import { ref, reactive, watch, onUnmounted, nextTick } from 'vue';
import { XBreadcrumb, XButton } from '@x/ui';

const tour = ref();
const guide = ref();

const el1 = ref();
const el2 = ref();
const el3 = ref();
const el4 = ref();

const flux = reactive({
  showTour: false,
  index: 0,
  begin() {
    flux.showTour = true;
    flux.tour1();
  },
  previous() {
    flux.index -= 1;
    if (flux.index === 0) flux.tour1();
    if (flux.index === 1) flux.tour2();
    if (flux.index === 2) flux.tour3();
  },
  next() {
    flux.index += 1;
    if (flux.index === 1) flux.tour2();
    if (flux.index === 2) flux.tour3();
    if (flux.index === 3) flux.tour4();
  },
  tour1() {
    flux.index = 0;

    nextTick(() => {
      el1.value.scrollIntoView({ block: 'center' });
      const rect = el1.value.getBoundingClientRect();

      tour.value.style.width = `${rect.width}px`;
      tour.value.style.height = `${rect.height}px`;
      tour.value.style.left = `${rect.x}px`;
      tour.value.style.top = `${rect.y}px`;

      guide.value.style.left = `${rect.x}px`;
      guide.value.style.top = `${rect.y + rect.height + 16}px`;
    });
  },
  tour2() {
    flux.index = 1;

    nextTick(() => {
      el2.value.scrollIntoView({ block: 'center' });
      const rect = el2.value.getBoundingClientRect();

      tour.value.style.width = `${rect.width}px`;
      tour.value.style.height = `${rect.height}px`;
      tour.value.style.left = `${rect.x}px`;
      tour.value.style.top = `${rect.y}px`;

      guide.value.style.left = `${rect.x}px`;
      guide.value.style.top = `${rect.y + rect.height + 16}px`;
    });
  },
  tour3() {
    flux.index = 2;

    nextTick(() => {
      el3.value.scrollIntoView({ block: 'center' });
      const rect = el3.value.getBoundingClientRect();

      tour.value.style.width = `${rect.width}px`;
      tour.value.style.height = `${rect.height}px`;
      tour.value.style.left = `${rect.x}px`;
      tour.value.style.top = `${rect.y}px`;

      guide.value.style.left = `${rect.x}px`;
      guide.value.style.top = `${rect.y + rect.height + 16}px`;
    });
  },
  tour4() {
    flux.index = 3;

    nextTick(() => {
      el4.value.scrollIntoView({ block: 'center' });
      const rect = el4.value.getBoundingClientRect();

      tour.value.style.width = `${rect.width}px`;
      tour.value.style.height = `${rect.height}px`;
      tour.value.style.left = `${rect.x}px`;
      tour.value.style.top = `${rect.y}px`;

      guide.value.style.left = `${rect.x}px`;
      guide.value.style.top = `${rect.y + rect.height + 16}px`;
    });
  },
});

watch(
  () => flux.showTour,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'auto';
  },
);

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Navigation' }, { text: 'Tours' }]" />

  <div class="my-4">
    <div ref="el1" class="text-3xl font-bold">Tours</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div>
      <XButton @click="flux.begin">Begin Tour</XButton>
    </div>
  </div>

  <div
    v-if="flux.showTour"
    ref="tour"
    class="fixed z-101 pointer-events-none rounded transition-all border-2 border-primary-600"
    style="box-shadow: rgba(100, 116, 139, 0.5) 0 0 0 3333px"
  ></div>

  <div
    v-if="flux.showTour"
    ref="guide"
    class="fixed z-102 bg-white dark:bg-slate-800 rounded-lg p-4 transition-all"
  >
    <div class="font-bold text-lg mb-2">Bottom</div>
    <div>On the bottom of target.</div>

    <div class="flex items-center mt-6">
      <div class="text-sm">{{ flux.index + 1 }}/4</div>

      <div class="flex space-x-2 ml-8">
        <XButton color="secondary" @click="flux.showTour = false">Skip</XButton>
        <XButton v-if="flux.index > 0" color="info" @click="flux.previous">Previous</XButton>
        <XButton v-if="flux.index + 1 < 4" @click="flux.next">Next</XButton>
      </div>
    </div>

    <div
      class="absolute top-0 left-10 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-slate-800 border-t border-l dark:border-slate-800 rounded-tl"
    ></div>

    <!-- top -->
    <!-- <div
        class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white border-t border-l rounded-tl"
      ></div> -->

    <!-- right -->
    <!-- <div
        class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white border-t border-r rounded-tr"
      ></div> -->

    <!-- bottom -->
    <!-- <div
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r border-b rounded-rb"
      ></div> -->

    <!-- left -->
    <!-- <div
        class="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white border-l border-b rounded-lb"
      ></div> -->
  </div>

  <div role="status" class="my-7 animate-pulse">
    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
    <span class="sr-only">Loading...</span>
  </div>

  <div
    ref="el2"
    class="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"
  >
    <div class="i-bi-image-alt w-12 h-12 text-gray-200"></div>
  </div>

  <div role="status" class="my-6 animate-pulse">
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
    <span class="sr-only">Loading...</span>
  </div>

  <div role="status" class="my-6 animate-pulse">
    <div ref="el3" class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <span class="sr-only">Loading...</span>
  </div>

  <div role="status" class="mb-6 mt-7 animate-pulse">
    <div ref="el4" class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
