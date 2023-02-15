<script lang="ts" setup>
import Button from './Button.vue';

defineProps<{
  value?: number;
  count?: number;
}>();
</script>

<template>
  <div class="flex gap-2">
    <div>
      <Button variant="text" icon="i-mdi-chevron-left" />
    </div>

    <div>
      <Button variant="contained" class="important:(rounded-full py-2 px-0 min-w-38px)">1</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">2</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">3</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">4</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">5</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">6</Button>
    </div>

    <div>
      <Button variant="text" icon="i-mdi-chevron-right" />
    </div>
  </div>

  <div class="flex gap-2">
    <div>
      <Button variant="text" icon="i-mdi-chevron-left" />
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">1</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">2</Button>
    </div>

    <div>
      <Button variant="contained" class="important:(rounded-full py-2 px-0 min-w-38px)">3</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">4</Button>
    </div>

    <div class="w-38px text-center">...</div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">21</Button>
    </div>

    <div>
      <Button variant="text" icon="i-mdi-chevron-right" />
    </div>
  </div>

  <div class="flex gap-2">
    <div>
      <Button variant="text" icon="i-mdi-chevron-left" />
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">1</Button>
    </div>

    <div class="w-38px text-center">...</div>

    <div>
      <Button variant="contained" class="important:(rounded-full py-2 px-0 min-w-38px)">4</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">5</Button>
    </div>

    <div class="w-38px text-center">...</div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">21</Button>
    </div>

    <div>
      <Button variant="text" icon="i-mdi-chevron-right" />
    </div>
  </div>

  <div class="flex gap-2">
    <div>
      <Button variant="text" icon="i-mdi-chevron-left" />
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">1</Button>
    </div>

    <div class="w-38px text-center">...</div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">18</Button>
    </div>

    <div>
      <Button variant="contained" class="important:(rounded-full py-2 px-0 min-w-38px)">19</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">20</Button>
    </div>

    <div>
      <Button variant="text" class="important:(rounded-full py-2 px-0 min-w-38px)">21</Button>
    </div>

    <div>
      <Button variant="text" icon="i-mdi-chevron-right" />
    </div>
  </div>
</template>
