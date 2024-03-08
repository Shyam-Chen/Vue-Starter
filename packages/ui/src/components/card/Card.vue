<template>
  <div class="Card">
    <div class="Card-Header">
      <slot name="header"></slot>
    </div>

    <div class="Card-Body">
      <div class="Card-Title">
        <slot name="title"></slot>
      </div>

      <div class="Card-Subtitle">
        <slot name="subtitle"></slot>
      </div>

      <div class="CardContent">
        <slot></slot>
      </div>

      <div class="Card-Footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Card {
  @apply bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
}

.Card-Header {
  @apply empty:hidden;
}

.Card-Body {
  @apply p-4 lg:p-6 flex flex-col;
}

.Card-Title {
  @apply text-2xl font-semibold mb-2 empty:hidden;
}

.Card-Subtitle {
  @apply text-lg mb-2 text-zinc-400 dark:text-zinc-500 empty:hidden;
}

.Card-Footer {
  @apply empty:hidden mt-8;
}
</style>
