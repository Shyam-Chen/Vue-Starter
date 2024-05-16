import chunk from 'lodash/chunk';
import orderBy from 'lodash/orderBy';

export default <T extends Record<string, any>>(
  rows: T[],
  control = { rows: 10, page: 1, field: 'createdAt', direction: 'desc' } as any,
) => {
  if (!rows?.length) return [];

  let arr = [...rows];

  if (control.field && control.direction === 'asc') {
    arr = orderBy(arr, control.field, 'asc');
  }

  if (control.field && control.direction === 'desc') {
    arr = orderBy(arr, control.field, 'desc');
  }

  const chunked = chunk(arr, control.rows);

  return chunked[control.page - 1];
};
