import chunk from 'lodash/chunk';
import sortBy from 'lodash/sortBy';

export default <T extends Record<string, any>>(
  rows: T[],
  control = { rows: 10, page: 1, field: 'createdAt', direction: 'desc' } as any,
) => {
  if (!rows?.length) return [];

  let arr = [...rows];

  if (control.field && control.direction === 'asc') {
    arr = sortBy(arr, (item) => item[control.field]);
  }

  if (control.field && control.direction === 'desc') {
    arr = sortBy(arr, (item) => item[control.field]).reverse();
  }

  const chunked = chunk(arr, control.rows);

  return chunked[control.page - 1];
};
