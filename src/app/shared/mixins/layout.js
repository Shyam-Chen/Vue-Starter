// @flow

type Data = {
  isMobile: boolean,
};

export default {
  data(): Data {
    return {
      isMobile: window.matchMedia('(max-width: 600px)').matches,
    };
  },
  mounted() {
    this.$nextTick((): void => {
      window.addEventListener('resize', (): void => {
        Object.assign(this.$data, this.$options.data());
      });
    });
  },
};
