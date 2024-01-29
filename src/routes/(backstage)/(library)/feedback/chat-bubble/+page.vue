<script lang="ts" setup>
import { XBreadcrumb, XCard, XChatBubble } from '@x/ui';
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Library' }, { text: 'Feedback' }, { text: 'ChatBubble' }]" />

  <h1 class="text-4xl font-extrabold my-4">ChatBubble</h1>

  <section class="my-8">
    <h2 class="text-3xl font-bold my-4">Basic</h2>

    <XCard>
      <div class="flex flex-col gap-4">
        <XChatBubble />

        <XChatBubble self class="justify-end" />
      </div>
    </XCard>
  </section>
</template>
