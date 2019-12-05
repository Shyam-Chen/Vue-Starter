import layout from '../layout';

describe('Mixins', () => {
  it('should handle layout', () => {
    expect(layout.data().isMobile).toBe(false);
  });
});
