import timeSince from '../time-since';

describe('time-since', () => {
  it('should handle', () => {
    expect(timeSince(Date.now())).toMatch('a few seconds ago');
    expect(timeSince(Date.now() - 60 * 1000)).toMatch('a minute ago');
    expect(timeSince(Date.now() - 2 * 60 * 1000)).toMatch('2 minutes ago');
    expect(timeSince(Date.now() - 60 * 60 * 1000)).toMatch('an hour ago');
    expect(timeSince(Date.now() - 2 * 60 * 60 * 1000)).toMatch('2 hours ago');
    expect(timeSince(Date.now() - 24 * 60 * 60 * 1000)).toMatch('a day ago');
    expect(timeSince(Date.now() - 2 * 24 * 60 * 60 * 1000)).toMatch('2 days ago');
    expect(timeSince(Date.now() - 30 * 24 * 60 * 60 * 1000)).toMatch('a month ago');
    expect(timeSince(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000)).toMatch('2 months ago');
    expect(timeSince(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000)).toMatch('a year ago');
    expect(timeSince(Date.now() - 2 * 12 * 30 * 24 * 60 * 60 * 1000)).toMatch('2 years ago');
  });
});
