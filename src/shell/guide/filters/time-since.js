// @flow

export default (value: any): string => {
  const ago = new Date(value);
  const now = new Date();

  const seconds = Math.round(Math.abs((now.getTime() - ago.getTime()) / 1000));
  const minutes = Math.round(Math.abs(seconds / 60));
  const hours = Math.round(Math.abs(minutes / 60));
  const days = Math.round(Math.abs(hours / 24));
  const months = Math.round(Math.abs(days / 30.416));
  const years = Math.round(Math.abs(days / 365));

  if (seconds <= 45) return 'a few seconds ago';
  if (seconds <= 90) return 'a minute ago';
  if (minutes <= 45) return `${minutes} minutes ago`;
  if (minutes <= 90) return 'an hour ago';
  if (hours <= 22) return `${hours} hours ago`;
  if (hours <= 36) return 'a day ago';
  if (days <= 25) return `${days} days ago`;
  if (days <= 45) return 'a month ago';
  if (days <= 345) return `${months} months ago`;
  if (days <= 545) return 'a year ago';
  return `${years} years ago`;
};
