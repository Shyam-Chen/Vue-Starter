export default () => {
  if (!localStorage.getItem('token')) {
    return { path: '/sign-in' };
  }

  const expiresIn = localStorage.getItem('expiresIn');

  if (expiresIn && new Date().toISOString() >= expiresIn) {
    return { path: '/sign-in' };
  }

  return true;
};
