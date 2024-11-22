<script lang="ts" setup>
import { ref } from 'vue';
import { XButton, XDialog, XDivider } from '@x/ui';

import WithinTableCell from './WithinTableCell.vue';

const status = ref(false);
const more = ref(false);
</script>

<template>
  <XButton label="Launch" @click="status = true" />

  <XDialog v-model="status" title="With Table within Dialog">
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>

    <XDivider />

    <WithinTableCell />

    <XDivider />

    <div>
      <XButton color="info" @click="more = !more">More</XButton>

      <div v-if="more" class="flex flex-col gap-4 mt-4">
        <p v-for="num in 5" :key="num">
          {{ num }}. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book. It
          has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  </XDialog>
</template>
