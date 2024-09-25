<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref } from 'vue';
import { XBreadcrumb, XButton, XCard, XPullToRefresh } from '@x/ui';

type XPullToRefreshProps = ComponentProps<typeof XPullToRefresh>;

const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const onRefresh: XPullToRefreshProps['onRefresh'] = async (done) => {
  console.log('loading...');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  list.value = [...list.value].map((item) => item * 2);
  console.log('load finish');
  done();
};

const more = ref(false);
</script>

<template>
  <XPullToRefresh @refresh="onRefresh">
    <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'PullToRefresh' }]" />

    <h1 class="text-4xl font-extrabold my-4">PullToRefresh</h1>

    <section class="my-8">
      <h2 class="text-3xl font-bold my-4">Basic</h2>

      <XCard>
        <div>Pull this page down to trigger the refresh.</div>

        <div class="mt-4">
          <XButton color="info" @click="more = !more">More</XButton>

          <div v-if="more" class="flex flex-col gap-4 mt-4">
            <div v-for="num in 5" :key="num">
              {{ num }}. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
        </div>
      </XCard>
    </section>
  </XPullToRefresh>
</template>
