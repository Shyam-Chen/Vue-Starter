import sentry from './sentry';
import serviceWorker from './service-worker';

export default () => {
  sentry();
  serviceWorker();
};
