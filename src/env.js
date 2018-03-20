export const SITE_URL = process.env.SITE_URL || 'https://vue-by-example.firebaseapp.com';
export const FUNC_URL = process.env.FUNC_URL || 'http://localhost:5000/vue-by-example/us-central1';

export const INJECT_APP = {
  FUNC_URL: JSON.stringify(FUNC_URL),
};
