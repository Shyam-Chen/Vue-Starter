<script lang="ts" setup>
type MeterItem = {
  label?: string;
  value?: number;
  color?: string;
  icon?: string;
};

const defaultModel = defineModel<MeterItem[]>({ default: [] });
</script>

<template>
  <div class="MeterGroup">
    <div class="overflow-hidden flex w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-md">
      <div
        v-for="(item, index) in defaultModel"
        :key="index"
        :class="[item.color, { 'rounded-e-md': defaultModel.length - 1 === index }]"
        :style="{ 'flex-basis': `${item.value}%` }"
      ></div>
    </div>

    <div class="flex gap-4">
      <div v-for="(item, index) in defaultModel" :key="index" class="flex items-center gap-2">
        <div class="i-material-symbols-circle size-2" :class="item.color"></div>
        <div class="text-sm">{{ item.label }} ({{ item.value }}%)</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.MeterGroup {
  @apply w-full flex flex-col gap-2.5;
}
</style>
