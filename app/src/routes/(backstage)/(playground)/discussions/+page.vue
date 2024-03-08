<script lang="ts" setup>
import { ref } from 'vue';
import { useLocaler } from 'vue-localer';
import { XBreadcrumb, XCard, XChatBubble, XChatBox } from '@x/ui';
import { intlFormat } from 'date-fns';

const localer = useLocaler();

const replies = [
  'Praesent sed tortor vel quam tempus maximus pharetra ac neque.',
  'Vivamus sollicitudin ligula vel convallis fringilla.',
  'Pellentesque ac augue eu leo placerat egestas.',
  'Sed pellentesque sapien quis enim malesuada malesuada.',
  'Praesent ut ligula sed ipsum viverra fermentum non at odio.',
  'Mauris rhoncus tellus et est elementum, quis volutpat dolor tristique.',
  'Mauris sodales sapien id lacus condimentum luctus.',
  'Nunc malesuada nisi et metus congue semper.',
  'Donec convallis felis at massa imperdiet, a vestibulum felis dignissim.',
  'Nullam nec mi sit amet lacus tempus mollis id a mi.',
  'Quisque malesuada est et mi condimentum, eget sodales lectus luctus.',
  'Nulla in sapien quis leo sodales elementum.',
  'Integer porttitor est non vestibulum lacinia.',
  'Curabitur tincidunt lectus ac nisi lacinia, vel ultricies odio lobortis.',
];

interface Bubble {
  message?: string;
  time?: string;
  self?: boolean;
}

const bubbles = ref<Bubble[]>([]);

const message = ref('');

const onSend = () => {
  if (!message.value) return;

  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  bubbles.value = [
    ...bubbles.value,
    {
      message: message.value,
      time: intlFormat(
        new Date(),
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
        {
          locale: localer.lang.value,
        },
      ),
      self: true,
    },
    {
      message: randomReply,
      time: intlFormat(
        new Date(),
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
        {
          locale: localer.lang.value,
        },
      ),
    },
  ];

  message.value = '';
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Discussions' }]" />

  <h1 class="text-4xl font-extrabold my-4">Discussions</h1>

  <XCard class="my-8">
    <div class="flex flex-col gap-4 min-h-xs">
      <XChatBubble
        v-for="(bubble, bubbleIndex) in bubbles"
        :key="bubbleIndex"
        :chat="bubble"
        :self="bubble.self"
        :class="{ 'justify-end': bubble.self }"
      />
    </div>
  </XCard>

  <XCard class="my-8">
    <XChatBox v-model="message" @send="onSend" />
  </XCard>
</template>
