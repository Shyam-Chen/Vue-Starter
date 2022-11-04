<script lang="ts" setup>
import { reactive } from 'vue';
import uniqueId from 'lodash/uniqueId';

defineProps({
  placeholder: {
    type: String,
    default: 'Choose a file',
  },
});

const emit = defineEmits(['change']);

const uid = uniqueId('file-input-');

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
    class="flex justify-between bg-white cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    <div v-else class="text-gray-400">{{ placeholder }}</div>

    <div class="i-fa-upload w-5 h-5"></div>
  </label>

  <input :id="uid" type="file" v-bind="$attrs" @change="flux.onChange" />
</template>

<style lang="scss" scoped>
input[type='file'] {
  display: none;
}
</style>
