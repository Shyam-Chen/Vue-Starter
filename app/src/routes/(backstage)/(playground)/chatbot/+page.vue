<script lang="ts" setup>
import { nextTick, ref, useTemplateRef } from 'vue';
import { XBreadcrumb, XChatBox, stream } from '@x/ui';

import MarkdownRenderer from './MarkdownRenderer.vue';

type Bubble =
  | {
      id?: string;
      content: string;
      role: 'user';
      querying?: boolean;
      stopped?: boolean;
    }
  | {
      id: string;
      content: string;
      role: 'assistant';
      querying?: boolean;
      stopped?: boolean;
    };

const conversation = useTemplateRef('conversation');

const bubbles = ref<Bubble[]>([]);
const connecting = ref(false);
const content = ref({ message: '', files: [] });
const controller = ref<AbortController>();
const assistantUuid = ref<null | string>(null);
const autoScroll = ref(true);

async function onSend() {
  connecting.value = true;

  const _message = content.value.message;
  bubbles.value = [...bubbles.value, { content: _message, role: 'user' }];
  content.value = { message: '', files: [] };

  assistantUuid.value = self.crypto.randomUUID();
  bubbles.value.push({ id: assistantUuid.value, content: '', role: 'assistant', querying: true });
  const targetIndex = bubbles.value.findIndex((item) => item.id === assistantUuid.value);

  if (autoScroll.value) {
    await nextTick();
    conversation.value?.scrollTo({ top: conversation.value.scrollHeight });
  }

  controller.value = new AbortController();

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
    signal: controller.value.signal,
  });

  for await (const event of events) {
    if (event.event === 'end') break;

    const content = JSON.parse(event.data as string)?.answer || '';
    if (content && bubbles.value[targetIndex].querying) bubbles.value[targetIndex].querying = false;
    bubbles.value[targetIndex].content += content;

    if (autoScroll.value) {
      await nextTick();
      conversation.value?.scrollTo({ top: conversation.value.scrollHeight });
    }
  }

  connecting.value = false;
  assistantUuid.value = null;
}

function onStop() {
  controller.value?.abort();
  connecting.value = false;

  if (assistantUuid.value) {
    const targetIndex = bubbles.value.findIndex((item) => item.id === assistantUuid.value);
    if (bubbles.value[targetIndex].querying) bubbles.value[targetIndex].stopped = true;
    assistantUuid.value = null;
  }
}

function onScroll(evt: Event) {
  const target = evt.target as HTMLDivElement;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;

  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  autoScroll.value = isAtBottom;
}
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Chatbot' }]" />

  <h1 class="text-4xl font-extrabold my-4">Chatbot</h1>

  <div class="Chatbot">
    <div class="flex flex-col justify-between gap-4 h-full">
      <div ref="conversation" class="flex flex-col gap-4 overflow-auto" @scroll="onScroll">
        <div v-for="(bubble, index) in bubbles" :key="index">
          <div v-if="bubble.role === 'user'" class="flex justify-end">
            <div class="justify-end bg-gray-200 dark:bg-slate-700 px-5 py-2.5 rounded-3xl">
              <div v-html="bubble.content"></div>
            </div>
          </div>

          <div v-if="bubble.role === 'assistant'" class="flex gap-4">
            <div class="size-8">
              <div class="i-material-symbols-robot-2-outline size-8"></div>
            </div>

            <MarkdownRenderer v-if="bubble.stopped" content="<em>Query canceled.</em>" />
            <div v-else-if="bubble.querying" class="py-1">
              <div class="ChatAns-Dot"></div>
              <div class="ChatAns-Dot"></div>
              <div class="ChatAns-Dot"></div>
            </div>
            <MarkdownRenderer v-else :content="bubble.content" />
          </div>
        </div>
      </div>

      <XChatBox
        v-model="content"
        :loading="connecting"
        hideUploadButton
        stoppable
        @send="onSend"
        @stop="onStop"
      />
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
