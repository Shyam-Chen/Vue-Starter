<script lang="ts" setup>
import { nextTick, ref, useTemplateRef } from 'vue';
import { XBreadcrumb, XChatBox, stream } from '@x/ui';

import MarkdownRenderer from './MarkdownRenderer.vue';

const conversation = useTemplateRef('conversation');

const bubbles = ref<any[]>([]);

const uploading = ref(false);
const loading = ref(false);
const content = ref({ message: '', files: [] });

async function onUpload() {
  //
}

async function onSend() {
  const _message = content.value.message;

  bubbles.value = [
    ...bubbles.value,
    {
      chatBox: _message,
      role: 'user',
    },
  ];

  content.value = { message: '', files: [] };

  const events = await stream('/conversation', {
    method: 'POST',
    body: JSON.stringify({
      messages: [
        {
          id: self.crypto.randomUUID(),
          content: _message,
          role: 'user',
        },
      ],
    }),
  });

  const assistantUuid = self.crypto.randomUUID();

  bubbles.value.push({
    id: assistantUuid,
    content: '',
    role: 'assistant',
  });

  const targetIndex = bubbles.value.findIndex((item) => item.id === assistantUuid);

  for await (const event of events) {
    if (targetIndex !== -1) {
      bubbles.value[targetIndex].content += JSON.parse(event.data as string)?.answer || '';
      await nextTick();
      conversation.value?.scrollTo({ top: conversation.value.scrollHeight });
    }
  }
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Chatbot' }]" />

  <h1 class="text-4xl font-extrabold my-4">Chatbot</h1>

  <div class="Chatbot">
    <div class="flex flex-col justify-between gap-4 h-full">
      <div ref="conversation" class="flex flex-col gap-4 overflow-auto">
        <div v-for="(bubble, index) in bubbles" :key="index">
          <div class="flex" :class="{ 'justify-end': bubble.role === 'user' }">
            <div
              v-if="bubble.role === 'user'"
              class="justify-end bg-gray-200 dark:bg-slate-700 px-5 py-2.5 rounded-3xl"
            >
              <div v-html="bubble.chatBox"></div>
            </div>
          </div>

          <div v-if="bubble.role === 'assistant'" class="flex gap-4">
            <div class="size-8">
              <div class="i-material-symbols-robot-2-outline size-8"></div>
            </div>

            <MarkdownRenderer v-if="bubble.content" :content="bubble.content" />
            <div v-else class="py-1">
              <div class="ChatAns-Dot"></div>
              <div class="ChatAns-Dot"></div>
              <div class="ChatAns-Dot"></div>
            </div>
          </div>
        </div>
      </div>

      <XChatBox v-model="content" :uploading :loading @uploadFiles="onUpload" @send="onSend" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Chatbot {
  @apply p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
  @apply my-8 h-[calc(100dvh-15.25rem)] md:h-[calc(100dvh-16.25rem)] lg:h-[calc(100dvh-17.25rem)];
}

.ChatAns-Dot {
  @apply bg-slate-500 dark:bg-slate-400 rounded-full inline-block h-3 w-3;

  animation: dot-pulse 0.9s ease both infinite;

  @keyframes dot-pulse {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  &:nth-of-type(1) {
    animation-delay: 0;
  }

  &:nth-of-type(2) {
    animation-delay: 0.3s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.6s;
  }
}
</style>
