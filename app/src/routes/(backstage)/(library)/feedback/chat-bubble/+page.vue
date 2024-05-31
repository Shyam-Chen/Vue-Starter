<script lang="ts" setup>
import { ref } from 'vue';
import { XBreadcrumb, XCard, XChatBubble } from '@x/ui';

const bubbles = ref([
  {
    id: 1,
    name: 'Bonnie Green',
    time: '11:46',
    chatBox: {
      message: `That's awesome. I think our users will really appreciate the improvements.`,
      files: [],
    },
  },
  {
    id: 2,
    time: '11:47',
    chatBox: {
      message: `I'm working from home today! 😅`,
      files: [],
    },
    self: true,
  },
  {
    id: 3,
    name: 'Bonnie Green',
    time: '11:52',
    chatBox: {
      message: `Check out this open-source UI component library based on Tailwind CSS: <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/themesberg/flowbite">https://github.com/themesberg/flowbite</a>`,
      files: [],
    },
  },
]);
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'ChatBubble' }]" />

  <h1 class="text-4xl font-extrabold my-4">ChatBubble</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex flex-col gap-4">
        <XChatBubble
          v-for="bubble in bubbles"
          :key="bubble.id"
          v-model="bubble.chatBox"
          :chat="bubble"
          :class="{ 'justify-end': bubble.self }"
        />
      </div>
    </XCard>
  </section>
</template>
