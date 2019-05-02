import convertSeconds from '../convert-seconds';

describe('convert-seconds', () => {
  it('should handle', () => {
    expect(convertSeconds(44230)).toMatch('12:17:10');
    expect(convertSeconds(4230)).toMatch('01:10:30');
    expect(convertSeconds(777)).toMatch('12:57');
    expect(convertSeconds(390)).toMatch('06:30');
    expect(convertSeconds(12)).toMatch('00:12');
    expect(convertSeconds(3)).toMatch('00:03');
  });
});
