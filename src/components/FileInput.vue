<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  placeholder?: string;
}>();

const emit = defineEmits<{
  (evt: 'change', val: Event): void;
}>();

const uid = uniqueId('file-input-');

const placeholderRef = toRef(props, 'placeholder', 'Choose a file');

const flux = reactive({
  fileNames: [] as string[],
  onChange(event: Event) {
    const el = event.target as HTMLInputElement;
    const files = Array.from(el.files || []);
    flux.fileNames = files.map((file) => file.name);
    emit('change', event);
  },
});
</script>

<template>
  <label
    :for="uid"
    class="flex justify-between bg-white dark:bg-slate-800 cursor-pointer shadow appearance-none border border-slate-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
  >
    <div v-if="flux.fileNames.length > 1" class="flex flex-wrap gap-1">
      <div
        v-for="item in flux.fileNames"
        :key="item"
        class="text-xs rounded inline-block whitespace-nowrap text-center bg-blue-600 text-white"
        style="padding: 1.5px 0.5rem"
      >
        {{ item }}
      </div>
    </div>
    <div v-else-if="flux.fileNames.length === 1">{{ flux.fileNames[0] }}</div>
    <div v-else class="text-gray-400">{{ placeholderRef }}</div>

    <div class="file-input-append">
      <div class="i-fa-upload w-5 h-5"></div>
    </div>
  </label>

  <input
    :id="uid"
    ref="input"
    v-bind="$attrs"
    type="file"
    class="hidden"
    @change="flux.onChange"
    @click="($refs.input as HTMLInputElement).value = ''"
  />
</template>

<style lang="scss" scoped>
.file-input-append {
  @apply flex justify-center items-center;
  @apply -my-2 -mx-3 p-2 border-l border-slate-400 rounded rounded-l-0 bg-slate-100 dark:bg-slate-700;
}
</style>
