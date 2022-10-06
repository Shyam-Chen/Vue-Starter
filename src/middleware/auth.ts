export default (to, from) => {
  if (!localStorage.getItem('token')) {
    return { path: '/sign-in' };
  }

  return true;
};
