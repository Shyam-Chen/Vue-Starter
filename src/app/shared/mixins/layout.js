// @flow

type Data = {
  isMobile: boolean,
};

export default {
  data(): Data {
    return {
      isMobile: window.innerWidth < 600,
    };
  },
  mounted() {
    this.$nextTick((): void => {
      window.addEventListener('resize', (): void => {
        this.isMobile = window.innerWidth < 600;
      });
    });
  },
};
