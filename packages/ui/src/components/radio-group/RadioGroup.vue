<script lang="ts" setup>
import FormControl from '../form-control/FormControl.vue';

defineOptions({
  inheritAttrs: false,
});

const valueModel = defineModel<unknown>('value');

defineProps<{
  label?: string;
  options?: string[] | { label: string; value: unknown; [key: string]: unknown }[];
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean | string;
  help?: string;
}>();

const emit = defineEmits<{
  (evt: 'change', val: unknown): void;
}>();
</script>

<template>
  <FormControl v-slot="{ uid }" :label="label" :required="required" :invalid="invalid" :help="help">
    <div class="flex items-center gap-4">
      <label
        v-for="(item, index) in options"
        :key="index"
        class="flex items-center"
        :class="[disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer']"
      >
        <div class="relative flex justify-center items-center">
          <input
            :id="`${uid}-${index}`"
            v-model="valueModel"
            v-bind="$attrs"
            type="radio"
            :name="uid"
            :value="typeof item === 'object' ? item.value : item"
            :disabled="disabled"
            class="radio"
            :class="{ invalid }"
            @change="emit('change', valueModel)"
          />

          <div
            class="absolute select-none w-3.5 h-3.5 text-primary-500"
            :class="{
              'i-mdi-circle': valueModel === (typeof item === 'object' ? item.value : item),
            }"
          ></div>
        </div>

        <div class="ml-2">
          {{ typeof item === 'object' ? item.label : item }}
        </div>
      </label>
    </div>
  </FormControl>
</template>

<style lang="scss" scoped>
.radio {
  @apply appearance-none w-5 h-5 rounded-full bg-white border border-slate-400 dark:border-slate-600;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-400 focus:shadow-lg;

  &.invalid {
    @apply border-red-500 dark:border-red-500;
    @apply focus:ring-red-500 focus:border-red-500;
  }
}
</style>
