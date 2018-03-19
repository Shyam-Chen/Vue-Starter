export const SITE_URL = process.env.SITE_URL || 'https://vue-by-example.firebaseapp.com';
export const FUNC_URL = process.env.FUNC_URL || 'https://us-central1-vue-by-example.cloudfunctions.net';

export const INJECT_APP = {
  FUNC_URL: JSON.stringify(FUNC_URL),
};
