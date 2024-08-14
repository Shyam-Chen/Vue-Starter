<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { ref } from 'vue';
import { XBreadcrumb, XCard, XPullToRefresh } from '@x/ui';

type XPullToRefreshProps = ComponentProps<typeof XPullToRefresh>;

const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const onRefresh: XPullToRefreshProps['onRefresh'] = async (done) => {
  console.log('loading...');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  list.value = [...list.value].map((item) => item * 2);
  console.log('load finish');
  done();
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'PullToRefresh' }]" />

  <h1 class="text-4xl font-extrabold my-4">PullToRefresh</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <XPullToRefresh @refresh="onRefresh">
        <div v-for="item in list" :key="item">
          {{ item }}
        </div>
      </XPullToRefresh>
    </XCard>
  </section>
</template>
