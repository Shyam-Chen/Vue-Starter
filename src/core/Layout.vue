<script lang="ts" setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from 'yup';

const { locale } = useI18n();

const flux = reactive({
  enUS() {
    setLocale({
      mixed: {
        required: 'This is a required field',
      },
      string: {
        email: 'This must be a valid email',
        min: 'This must be at least 8 characters',
      },
    });
  },
  changeLocale() {
    if (locale.value === 'ja-JP') {
      setLocale({
        mixed: {
          required: 'これは必要項目です',
        },
        string: {
          email: 'This must be a valid email',
          min: 'This must be at least 8 characters',
        },
      });
    } else {
      flux.enUS();
    }
  },
});

flux.enUS();
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

    <select v-model="$i18n.locale" @change="flux.changeLocale">
      <option v-for="(lang, idx) in ['en-US', 'ja-JP', 'ko-KR', 'zh-TW']" :key="idx" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>
