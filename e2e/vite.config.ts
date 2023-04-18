import type { PlaywrightTestConfig } from '@playwright/test';

export default {
  use: {
    baseURL: 'http://0.0.0.0:8080',
  },
} as PlaywrightTestConfig;
