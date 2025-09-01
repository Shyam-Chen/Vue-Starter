import orderBy from 'lodash/orderBy';
import { controlDefaults } from '../../components/table/config';
import type { Control } from '../../components/table/types';

export default <T>(rows: T[], control: Control) => {
  if (!rows?.length) return [];

  const _rows = control.rows || controlDefaults.rows;
  const _page = control.page || controlDefaults.page;
  const _field = control.field || controlDefaults.field;
  const _direction = control.direction || controlDefaults.direction;

  const ordered = orderBy(rows, _field, _direction as 'asc' | 'desc');

  const start = (_page - 1) * _rows;
  const pagedRows = ordered.slice(start, start + _rows);

  return pagedRows;
};
