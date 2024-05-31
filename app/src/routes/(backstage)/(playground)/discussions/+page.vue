<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers';
import { reactive } from 'vue';
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

type XChatBubbleProps = ComponentProps<typeof XChatBubble>;
type XChatBoxProps = ComponentProps<typeof XChatBox>;

const state = reactive<{
  bubbles: XChatBubbleProps['chat'][];
  chatBox: XChatBoxProps['modelValue'];
}>({
  bubbles: [],
  chatBox: { message: '', files: [] },
});

const onSend = () => {
  const { chatBox } = state;
  if (!((chatBox?.message && chatBox?.message !== '<p></p>') || chatBox?.files?.length)) return;

  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  state.bubbles = [
    ...state.bubbles,
    {
      chatBox: state.chatBox,
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
      name: 'Bonnie Green',
      chatBox: {
        message: randomReply,
        files: [],
      },
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

  state.chatBox = { message: '', files: [] };
};

state.chatBox!.message = `I'm working from home today! 😅`;
onSend();

const onUploadFiles: XChatBubbleProps['onUploadFiles'] = (files) => {
  state.chatBox = {
    message: state.chatBox!.message,
    files: files.map((file) => ({
      ...file,
      name: file.name,
      url: 'https://example.com',
    })),
  };
};

const onBubbleUploadFiles = (
  files: File[],
  chatBox: XChatBoxProps['modelValue'],
  bubbleIndex: number,
) => {
  state.bubbles[bubbleIndex]!.chatBox!.files = [
    ...state.bubbles[bubbleIndex]!.chatBox!.files,
    ...files.map((file) => ({
      ...file,
      name: file.name,
      url: 'https://example.com',
    })),
  ];
};

const onSave = () => {
  console.log('save');
};

const onDelete = () => {
  console.log('delete');
};
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Discussions' }]" />

  <h1 class="text-4xl font-extrabold my-4">Discussions</h1>

  <XCard class="my-8">
    <div class="flex flex-col gap-4 min-h-xs">
      <XChatBubble
        v-for="(bubble, bubbleIndex) in state.bubbles"
        :key="bubbleIndex"
        v-model="bubble!.chatBox"
        :chat="bubble"
        :class="{ 'justify-end': bubble?.self }"
        @uploadFiles="onBubbleUploadFiles($event, bubble!.chatBox, bubbleIndex)"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </XCard>

  <XCard class="my-8">
    <XChatBox v-model="state.chatBox" @uploadFiles="onUploadFiles" @send="onSend" />
  </XCard>
</template>
