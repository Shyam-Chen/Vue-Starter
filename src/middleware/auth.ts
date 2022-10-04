export default (to, from) => {
  if (!sessionStorage.getItem('token')) {
    return { path: '/sign-in' };
  }

  return true;
};
