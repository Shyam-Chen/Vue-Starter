import { stream } from 'fetch-event-stream';

export default (url: string, init?: RequestInit) =>
  stream(`${process.env.API_URL}/api/${url}`, init);
