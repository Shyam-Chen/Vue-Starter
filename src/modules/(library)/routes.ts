import type { RouteRecordRaw } from 'vue-router';

import generalRoutes from './general/routes';
import layoutRoutes from './layout/routes';
import navigationRoutes from './navigation/routes';
import dataEntryRoutes from './data-entry/routes';
import dataDisplayRoutes from './data-display/routes';
import feedbackRoutes from './feedback/routes';
import chartsRoutes from './charts/routes';
import networkRoutes from './network/routes';

export default [
  ...generalRoutes,
  ...layoutRoutes,
  ...navigationRoutes,
  ...dataEntryRoutes,
  ...dataDisplayRoutes,
  ...feedbackRoutes,
  ...chartsRoutes,
  ...networkRoutes,
] as RouteRecordRaw[];
