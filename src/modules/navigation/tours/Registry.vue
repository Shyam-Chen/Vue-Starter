<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';

import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Button from '~/components/Button.vue';

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

  <div class="mb-4">
    <div ref="el1" class="text-3xl font-bold">Tours</div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div class="mb-2">Basic</div>

    <div>
      <Button color="primary" @click="flux.begin">Begin Tour</Button>
    </div>
  </div>

  <div
    v-if="flux.showTour"
    ref="tour"
    class="fixed z-101 pointer-events-none rounded transition-all"
    style="box-shadow: rgba(33, 33, 33, 0.5) 0 0 0 3333px"
  ></div>

  <div v-if="flux.showTour" ref="guide" class="fixed z-102 bg-white rounded-lg p-4 transition-all">
    <div class="font-bold text-slate-800 text-lg mb-2">Bottom</div>
    <div class="text-slate-700">On the bottom of target.</div>

    <div class="flex items-center mt-6">
      <div class="text-sm text-slate-500">{{ flux.index + 1 }}/4</div>

      <div class="flex space-x-2 ml-8">
        <Button @click="flux.showTour = false">Skip</Button>
        <Button v-if="flux.index > 0" @click="flux.previous">Previous</Button>
        <Button color="primary" @click="flux.next">Next</Button>
      </div>
    </div>

    <div
      class="absolute top-0 left-10 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white border-t border-l rounded-tl"
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

  <div class="flex flex-col border p-4 mb-4">
    <div ref="el2" class="mb-2">Columns 1</div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 border rounded shadow bg-slate-300">
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div ref="el3" class="mb-2">Columns 2</div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 border rounded shadow bg-slate-300">
        {{ num }}
      </div>
    </div>
  </div>

  <div class="flex flex-col border p-4 mb-4">
    <div ref="el4" class="mb-2">Columns 3</div>

    <div class="flex flex-col space-y-4">
      <div v-for="num in 5" :key="num" class="px-4 py-2 border rounded shadow bg-slate-300">
        {{ num }}
      </div>
    </div>
  </div>
</template>
