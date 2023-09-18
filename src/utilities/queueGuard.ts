import type { NavigationGuard } from 'vue-router';

export default (middleware: NavigationGuard[]) => {
  const beforeRouteEnter: NavigationGuard = async (to, from) => {
    for (const func of middleware) {
      const result = await func(to, from, () => {});
      if (result !== true) return result;
    }

    return true;
  };

  return beforeRouteEnter;
};
