// @flow

interface Layout {
  data(): {
    isMobile: boolean;
  };
}

export default ({
  data() {
    return {
      isMobile: window.innerWidth < 600,
    };
  },
}: Layout);
