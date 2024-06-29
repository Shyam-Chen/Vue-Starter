import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended';
import parserVue from 'vue-eslint-parser';

export default [
  // js
  pluginJs.configs.recommended,
  // ts
  ...tseslint.configs.recommended,
  {
    rules: {
      // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',
      // TS already checks for that, and Typescript-Eslint recommends to disable it
      // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // vue
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/v-on-event-hyphenation': ['error', 'never'],
      'vue/no-v-html': 'off',

      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': ['error', { order: ['script[setup]', 'template', 'style[scoped]'] }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': 'error',
      'vue/custom-event-name-casing': 'error',
      'vue/define-emits-declaration': 'error',
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
          defineExposeLast: true,
        },
      ],
      'vue/define-props-declaration': 'error',
      'vue/html-button-has-type': 'error',
      'vue/no-multiple-objects-in-class': 'warn',
      'vue/no-restricted-call-after-await': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-unused-refs': 'warn',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-v-text': 'error',
      'vue/padding-line-between-blocks': 'warn',
      'vue/prefer-define-options': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'warn',
      'vue/require-macro-variable-name': 'error',
      'vue/require-typed-ref': 'warn',
      'vue/v-for-delimiter-style': 'error',
      'vue/valid-define-options': 'error',
    },
  },
  // prettier
  pluginPrettierRecommendedConfigs,
];
