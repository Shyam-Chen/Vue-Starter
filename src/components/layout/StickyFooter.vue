<script setup>
import { useLang, useLocaler } from 'vue-localer';

const lang = useLang();
const localer = useLocaler();

function changeLang(event) {
  localer.dispatch('setLanguage', event.target.value);
}
</script>

<template>
  <footer class="sticky-footer flex-shrink-0 shadow-inner p-4">
    <div class="flex flex-col w-full max-w-6xl my-0 mx-auto md:h-16 md:flex-row">
      <div>
        <select
          class="border border-gray-600 text-gray-600"
          :value="lang"
          name="lang"
          @change="changeLang"
        >
          <option value="en-US">American English</option>
          <option value="ja-JP">日本語</option>
          <option value="zh-TW">正體中文</option>
        </select>
      </div>
    </div>
  </footer>
</template>
