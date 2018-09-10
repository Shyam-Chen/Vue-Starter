import layout from '../layout';

describe('Mixins', () => {
  it('should handle layout', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true })),
    });

    expect(layout.data().isMobile).toBe(true);
  });
});
