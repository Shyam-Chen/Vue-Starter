<script lang="ts" setup>
import { XBreadcrumb, XCard, XChatBubble } from '@x/ui';

const messageWithLink = `Check out this open-source UI component library based on Tailwind CSS: <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/themesberg/flowbite">https://github.com/themesberg/flowbite</a>`;
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'ChatBubble' }]" />

  <h1 class="text-4xl font-extrabold my-4">ChatBubble</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex flex-col gap-4">
        <XChatBubble
          :chat="{
            name: 'Bonnie Green',
            message: `That's awesome. I think our users will really appreciate the improvements.`,
            time: '11:46',
          }"
        />

        <XChatBubble
          :chat="{ message: `I'm working from home today! 😅` }"
          self
          class="justify-end"
        />

        <XChatBubble
          :chat="{
            name: 'Bonnie Green',
            message: messageWithLink,
            time: '11:46',
          }"
        />

        <XChatBubble
          :chat="{ message: `I'm working from home today! 😅` }"
          self
          class="justify-end"
        />
      </div>
    </XCard>
  </section>
</template>
