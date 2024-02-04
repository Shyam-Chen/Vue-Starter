<script lang="ts" setup>
import { XBreadcrumb, XCard, XChatBubble, XTextarea, XButton } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Playground' }, { text: 'Discussions' }]" />

  <h1 class="text-4xl font-extrabold my-4">Discussions</h1>

  <XCard class="my-8">
    <div class="flex flex-col gap-4">
      <XChatBubble />
      <XChatBubble />
      <XChatBubble />
      <XChatBubble self class="justify-end" />
      <XChatBubble self class="justify-end" />
      <XChatBubble />
      <XChatBubble />
      <XChatBubble self class="justify-end" />
    </div>
  </XCard>

  <XCard class="my-8">
    <XTextarea />

    <div class="flex justify-end mt-6">
      <XButton prepend="i-material-symbols-comment-rounded" label="Comment" />
    </div>
  </XCard>
</template>
