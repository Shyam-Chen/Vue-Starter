<template>
  <div class="Card">
    <div class="CardHeader">
      <slot name="header"></slot>
    </div>

    <div class="CardBody">
      <div class="CardTitle">
        <slot name="title"></slot>
      </div>

      <div class="CardSubtitle">
        <slot name="subtitle"></slot>
      </div>

      <div class="CardContent">
        <slot></slot>
      </div>

      <div class="CardFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Card {
  @apply bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
}

.CardHeader {
  @apply empty:hidden;
}

.CardBody {
  @apply p-6 flex flex-col;
}

.CardTitle {
  @apply text-2xl font-semibold mb-2;
}

.CardSubtitle {
  @apply text-lg mb-2 text-zinc-400 dark:text-zinc-500;
}

.CardContent {
  @apply my-4;
}

.CardFooter {
  @apply empty:hidden mt-8;
}
</style>
