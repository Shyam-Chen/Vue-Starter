export default () => {
  if (!localStorage.getItem('token')) {
    return { path: '/sign-in' };
  }

  return true;
};
