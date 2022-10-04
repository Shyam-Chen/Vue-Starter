<script lang="ts" setup>
</script>

<template>
  <div>
    <router-link
      to="/"
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      Home
    </router-link>

    <router-link
      to="/form-validation"
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      Form Validation
    </router-link>

    <router-link
      to="/store-pattern"
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      Store Pattern
    </router-link>

    <main class="p-4 my-20">
      <slot></slot>
    </main>

    <select v-model="$i18n.locale">
      <option v-for="(lang, idx) in ['en-US', 'ja-JP', 'ko-KR', 'zh-TW']" :key="idx" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>
