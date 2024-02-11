<script lang="ts" setup>
type MeterItem = {
  label?: string;
  value?: number;
  color?: string;
  icon?: string;
};

withDefaults(
  defineProps<{
    value?: MeterItem[];
    min?: number;
    max?: number;
  }>(),
  {
    value: () => [],
    min: 0,
    max: 100,
  },
);
</script>

<template>
  <div class="MeterGroup">
    <div class="overflow-hidden flex w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-md">
      <div
        v-for="(item, index) in value"
        :key="index"
        :class="[item.color || 'bg-primary-500', { 'rounded-e-md': value.length - 1 === index }]"
        :style="{ 'flex-basis': `${(Number(item.value) / max) * 100}%` }"
      ></div>
    </div>

    <div class="flex gap-4">
      <div v-for="(item, index) in value" :key="index" class="flex items-center gap-2">
        <div
          :class="[
            item.color || 'bg-primary-500',
            item.icon ? `${item.icon} size-5` : 'i-material-symbols-circle size-2',
          ]"
        ></div>
        <div class="text-sm">{{ item.label }} ({{ (Number(item.value) / max) * 100 }}%)</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.MeterGroup {
  @apply w-full flex flex-col gap-2.5;
}
</style>
