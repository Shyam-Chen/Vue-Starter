// @flow

import { email } from '~/shared/utils/regexp';

export const INITIAL = {
  nickname: '',
  nicknameRules: [
    () => !!INITIAL.nickname || 'This field is required',
    () => INITIAL.nickname.length <= 15 || 'Word length is too long',
  ],
  creditCard: '',
  phone: '',
  email: '',
  emailRules: [
    () => !!INITIAL.email || 'This field is required',
    () => email.test(INITIAL.email) || 'Email format error',
  ],
};
