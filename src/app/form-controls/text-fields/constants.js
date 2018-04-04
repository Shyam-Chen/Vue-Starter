// @flow

export const INITIAL = {
  nickname: '',
  nicknameRules: [
    () => !!INITIAL.nickname || 'This field is required',
    () => INITIAL.nickname.length <= 15 || 'Word length is too long',
  ],
};
