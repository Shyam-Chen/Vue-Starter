import layout from '../layout';

describe('Mixins', () => {
  it('should handle layout', () => {
    Object.defineProperty(window, 'innerWidth', { value: 360 });
    expect(layout.data().isMobile).toBe(true);
  });

  it('should handle layout', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280 });
    expect(layout.data().isMobile).toBe(false);
  });
});
